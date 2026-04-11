import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const getCharacterPixelRatioCap = (width: number) => {
  if (width <= 600) return 1.3;
  if (width <= 900) return 1.2;
  return 1.35;
};

export const applyHeroCameraFraming = (
  camera: THREE.PerspectiveCamera,
  width: number = window.innerWidth
) => {
  if (width > 1400) {
    camera.position.set(0, 12.95, 28.4);
    camera.zoom = 0.92;
  } else if (width > 1200) {
    camera.position.set(0, 13, 27.6);
    camera.zoom = 0.94;
  } else if (width > 1024) {
    camera.position.set(0, 13.05, 26.9);
    camera.zoom = 0.96;
  } else if (width > 768) {
    camera.position.set(0, 13.1, 25.7);
    camera.zoom = 0.99;
  } else if (width > 600) {
    camera.position.set(0, 13.1, 25.2);
    camera.zoom = 0.98;
  } else {
    camera.position.set(0, 13.05, 25.05);
    camera.zoom = 0.96;
  }
};

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  frameCamera?: (camera: THREE.PerspectiveCamera, width: number) => void
) {
  if (!canvasDiv.current) return;

  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = Math.max(1, Math.round(canvas3d.width));
  const height = Math.max(1, Math.round(canvas3d.height));
  const pixelRatioCap = getCharacterPixelRatioCap(window.innerWidth);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatioCap));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  if (frameCamera) {
    frameCamera(camera, window.innerWidth);
  }
  camera.updateProjectionMatrix();

  ScrollTrigger.refresh();
}
