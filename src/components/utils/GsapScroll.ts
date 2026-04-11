import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const getMeshStandardMaterial = (mesh: THREE.Mesh) => {
  const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  return material instanceof THREE.MeshStandardMaterial ? material : null;
};

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  ScrollTrigger.getById("char-landing")?.kill();
  ScrollTrigger.getById("char-about")?.kill();
  ScrollTrigger.getById("char-what")?.kill();
  const isDesktop = window.innerWidth > 1024;

  // Always restore base hero state before creating new timelines.
  gsap.set(".character-container", { opacity: 1 });
  gsap.set(".character-model", { x: "0%", y: "0%", pointerEvents: "inherit" });
  gsap.set(".landing-container", { opacity: 1, y: "0%" });

  let tl1: gsap.core.Timeline | null = null;
  let tl2: gsap.core.Timeline | null = null;
  let tl3: gsap.core.Timeline | null = null;

  if (isDesktop) {
    tl1 = gsap.timeline({
      scrollTrigger: {
        id: "char-landing",
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl2 = gsap.timeline({
      scrollTrigger: {
        id: "char-about",
        trigger: ".about-section",
        start: "center 55%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl3 = gsap.timeline({
      scrollTrigger: {
        id: "char-what",
        trigger: ".whatIDO",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }

  for (const object of character?.children ?? []) {
    if (object.name === "Plane004") {
      for (const child of object.children) {
        if (!(child instanceof THREE.Mesh)) continue;

        const material = getMeshStandardMaterial(child);
        if (!material) continue;

        material.transparent = true;
        material.opacity = 0;
        if (material.name === "Material.018") {
          material.color.set("#FFFFFF");
        }
      }
    }

    if (object.name === "screenlight" && object instanceof THREE.Mesh) {
      const material = getMeshStandardMaterial(object);
      if (!material) continue;

      material.transparent = true;
      material.opacity = 0;
      material.emissive.set("#B0F5EA");

      if (isDesktop) {
        gsap.killTweensOf(material);
        gsap.timeline({ repeat: -1, repeatRefresh: true }).to(material, {
          emissiveIntensity: () => Math.random() * 8,
          duration: () => Math.random() * 0.6,
          delay: () => Math.random() * 0.1,
        });
      } else {
        material.emissiveIntensity = 0;
      }
    }
  }

  if (isDesktop) {
    if (character && tl1 && tl2 && tl3) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.35, duration: 1 }, 0)
        .to(camera.position, { z: 25.4, duration: 1 }, 0)
        .to(".landing-container", { opacity: 0.35, duration: 1 }, 0)
        .fromTo(".about-me", { y: "-30%" }, { y: "0%", duration: 1 }, 0);

      tl2
        .to(camera.position, { z: 34, y: 10.2, duration: 1, ease: "power2.inOut" }, 0)
        .to(".about-section", { y: "18%", duration: 1 }, 0)
        .to(".about-section", { opacity: 0, duration: 1 }, 0.35)
        .to(character.rotation, { y: 0.55, x: 0.06, duration: 1 }, 0)
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 1 },
          0
        );

      tl3
        .to(".character-container", { opacity: 0, duration: 1 }, 0)
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-45%", duration: 1, ease: "none" },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "8%", duration: 1 }, 0)
        .to(character.rotation, { x: -0.04, duration: 1 }, 0);
    }
  }
}

export function setAllTimeline() {
  ScrollTrigger.getById("career-timeline")?.kill();

  if (window.innerWidth <= 1024) {
    gsap.set(".career-section", { y: 0 });
    gsap.set(".career-timeline", { opacity: 1, maxHeight: "100%" });
    gsap.set(".career-info-box", { opacity: 1 });
    return;
  }

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      id: "career-timeline",
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
