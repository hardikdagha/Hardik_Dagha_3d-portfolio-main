import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";
import { publicAssetUrl } from "../../../utils/publicAsset";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(publicAssetUrl("draco/"));
  loader.setDRACOLoader(dracoLoader);

  const getCharacterAsset = async () => {
    const fallbackUrl = publicAssetUrl("models/character.glb?v=3");

    if (!window.isSecureContext || !window.crypto?.subtle) {
      return { url: fallbackUrl, revoke: () => undefined };
    }

    try {
      const encryptedBlob = await decryptFile(
        publicAssetUrl("models/character.enc?v=2"),
        "Character3D#@"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
      return {
        url: blobUrl,
        revoke: () => URL.revokeObjectURL(blobUrl),
      };
    } catch (error) {
      console.warn("Falling back to the plain character model.", error);
      return { url: fallbackUrl, revoke: () => undefined };
    }
  };

  const loadCharacter = async () => {
    const { url, revoke } = await getCharacterAsset();

    return new Promise<GLTF | null>((resolve, reject) => {
      let settled = false;
      const loadTimeout = window.setTimeout(() => {
        fail(new Error("Timed out while loading character model."));
      }, 12000);

      const cleanup = () => {
        window.clearTimeout(loadTimeout);
        revoke();
        dracoLoader.dispose();
      };

      const succeed = (gltf: GLTF | null) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(gltf);
      };

      const fail = (error: unknown) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(
          error instanceof Error
            ? error
            : new Error("Unknown error while loading character model.")
        );
      };

      loader.load(
        url,
        async (gltf) => {
          try {
            const character = gltf.scene;
            try {
              await renderer.compileAsync(character, camera, scene);
            } catch (error) {
              console.warn("Pre-compile skipped due renderer limitations.", error);
            }

            character.traverse((child) => {
              if (!(child instanceof THREE.Mesh)) return;

              const mesh = child;
              const baseMaterial = Array.isArray(mesh.material)
                ? mesh.material[0]
                : mesh.material;

              if (baseMaterial instanceof THREE.MeshStandardMaterial) {
                if (mesh.name === "BODY.SHIRT") {
                  const newMat = baseMaterial.clone();
                  newMat.color = new THREE.Color("#8B4513");
                  mesh.material = newMat;
                } else if (mesh.name === "Pant") {
                  const newMat = baseMaterial.clone();
                  newMat.color = new THREE.Color("#000000");
                  mesh.material = newMat;
                }
              }

              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = true;
            });

            setCharTimeline(character, camera);
            setAllTimeline();
            character.getObjectByName("footR")!.position.y = 3.36;
            character.getObjectByName("footL")!.position.y = 3.36;

            // Responsive offsets keep the hero framing balanced on laptop and mobile.
            const width = window.innerWidth;
            if (width > 1280) {
              character.position.set(0, -0.42, 0);
              character.scale.setScalar(0.8);
            } else if (width > 1024) {
              character.position.set(0, -0.48, 0);
              character.scale.setScalar(0.78);
            } else if (width > 600) {
              character.position.set(0, -0.72, 0);
              character.scale.setScalar(0.72);
            } else {
              character.position.set(0, -0.82, 0);
              character.scale.setScalar(0.7);
            }

            // Monitor scale is handled by GsapScroll.ts animations
            succeed(gltf);
          } catch (error) {
            fail(error);
          }
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          fail(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
