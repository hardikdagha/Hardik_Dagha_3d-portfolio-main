import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      const canvasElement = canvasDiv.current;
      const getContainerSize = () => {
        const rect = canvasElement.getBoundingClientRect();
        return {
          width: Math.max(1, Math.round(rect.width || canvasElement.clientWidth || window.innerWidth)),
          height: Math.max(
            1,
            Math.round(
              rect.height ||
                canvasElement.clientHeight ||
                Math.max(300, window.innerHeight * 0.82)
            )
          ),
        };
      };

      const container = getContainerSize();
      const aspect = container.width / container.height;
      const scene = sceneRef.current;
      const getPreferredPixelRatio = () => {
        const ratio = window.devicePixelRatio || 1;
        return Math.min(ratio, window.innerWidth <= 900 ? 1 : 1.35);
      };

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        premultipliedAlpha: false,
        antialias: window.innerWidth > 900,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setClearAlpha(0);
      renderer.setSize(container.width, container.height, false);
      renderer.setPixelRatio(getPreferredPixelRatio());
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.domElement.style.backgroundColor = "transparent";
      canvasElement.appendChild(renderer.domElement);
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;
      let loadedCharacter: THREE.Object3D | null = null;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);
      let loaderReleased = false;

      const completeLoadingInstantly = () => {
        if (loaderReleased) return;
        loaderReleased = true;
        progress.clear();
      };

      const completeLoadingSmoothly = async () => {
        if (loaderReleased) return;
        loaderReleased = true;
        await progress.loaded();
      };

      const loadingTimeout = window.setTimeout(() => {
        completeLoadingInstantly();
      }, 3200);

      const startCharacterIntro = () => {
        setTimeout(() => {
          light.turnOnLights();
          animations?.startIntro();
        }, 2500);
      };

      let animations:
        | ReturnType<typeof setAnimations>
        | undefined;

      const resizeHandler = () => {
        if (loadedCharacter) {
          handleResize(renderer, camera, canvasDiv);
          return;
        }

        const { width, height } = getContainerSize();
        renderer.setPixelRatio(getPreferredPixelRatio());
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      loadCharacter()
        .then((gltf) => {
          window.clearTimeout(loadingTimeout);
          if (gltf) {
            animations = setAnimations(gltf);
            if (hoverDivRef.current) {
              animations.hover(gltf, hoverDivRef.current);
            }
            mixer = animations.mixer;
            const nextCharacter = gltf.scene;
            loadedCharacter = nextCharacter;
            scene.add(nextCharacter);
            headBone = nextCharacter.getObjectByName("spine006") || null;
            screenLight = nextCharacter.getObjectByName("screenlight") || null;

            if (loaderReleased) {
              startCharacterIntro();
            } else {
              completeLoadingSmoothly().then(() => {
                startCharacterIntro();
              });
            }

            window.addEventListener("resize", resizeHandler);
          }
        })
        .catch((error) => {
          window.clearTimeout(loadingTimeout);
          console.error("Character scene failed to load:", error);
          completeLoadingInstantly();
        });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      const mouseMoveHandler = (event: MouseEvent) => {
        onMouseMove(event);
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let animationFrameId = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        window.clearTimeout(loadingTimeout);
        progress.dispose();
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", resizeHandler);
        document.removeEventListener("mousemove", mouseMoveHandler);
        if (canvasElement.contains(renderer.domElement)) {
          canvasElement.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
