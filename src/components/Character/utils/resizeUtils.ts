import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>
) {
  if (!canvasDiv.current) return;

  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = Math.max(1, Math.round(canvas3d.width));
  const height = Math.max(1, Math.round(canvas3d.height));
  const pixelRatioCap = window.innerWidth <= 900 ? 1 : 1.35;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatioCap));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  ScrollTrigger.refresh();
}
