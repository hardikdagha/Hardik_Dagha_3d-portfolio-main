import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { profile } from "../data/profile";
import { publicAssetUrl } from "../utils/publicAsset";

const palette = [
  { accent: "#2ae8aa", glow: "#7ef5c8", background: "#0a1a23" },
  { accent: "#6fe7ff", glow: "#9fdbff", background: "#121d31" },
  { accent: "#f4c95d", glow: "#ffe1a0", background: "#1b1a12" },
  { accent: "#9de27a", glow: "#c6f7a8", background: "#111f19" },
];

function createToolTexture(label: string, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 540;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const theme = palette[index % palette.length];
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, theme.background);
  gradient.addColorStop(1, "#071018");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = `${theme.accent}55`;
  ctx.lineWidth = 12;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  ctx.fillStyle = `${theme.accent}22`;
  ctx.fillRect(52, 52, canvas.width - 104, canvas.height - 104);

  ctx.fillStyle = theme.glow;
  ctx.font = '600 34px "IBM Plex Mono", monospace';
  ctx.textAlign = "left";
  ctx.fillText("SECURITY TOOL", 86, 116);

  ctx.fillStyle = "#ecfff7";
  ctx.font = '700 88px "Space Grotesk", sans-serif';
  ctx.fillText(label.toUpperCase(), 84, 280);

  ctx.fillStyle = "#90a9b8";
  ctx.font = '500 28px "IBM Plex Mono", monospace';
  ctx.fillText("monitoring • investigation • response", 86, 360);

  ctx.beginPath();
  ctx.fillStyle = theme.accent;
  ctx.arc(canvas.width - 98, 98, 26, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

type ToolCardProps = {
  index: number;
  label: string;
  position: [number, number, number];
};

const ToolCard = ({ index, label, position }: ToolCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const theme = palette[index % palette.length];

  const material = useMemo(() => {
    const texture = createToolTexture(label, index);

    return new THREE.MeshPhysicalMaterial({
      map: texture,
      emissive: new THREE.Color(theme.accent),
      emissiveMap: texture,
      emissiveIntensity: 0.35,
      metalness: 0.2,
      roughness: 0.92,
      clearcoat: 0.15,
    });
  }, [index, label, theme.accent]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const t = state.clock.getElapsedTime() + index * 0.35;
    mesh.position.y = position[1] + Math.sin(t * 0.9) * 0.28;
    mesh.position.x = position[0] + Math.cos(t * 0.55) * 0.12;
    mesh.rotation.y = Math.sin(t * 0.45) * 0.24;
    mesh.rotation.x = Math.cos(t * 0.35) * 0.08;
    mesh.rotation.z = Math.sin(t * 0.3) * 0.04;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[3.3, 2.02, 0.14]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const ToolCloud = () => {
  const groupRef = useRef<THREE.Group>(null);

  const cards = useMemo(
    () =>
      profile.toolkit.map((label, index) => {
        const angle = (index / profile.toolkit.length) * Math.PI * 2;
        const radius = 4.8 + (index % 3) * 0.8;
        const x = Math.cos(angle) * radius;
        const y = ((index % 4) - 1.5) * 1.45;
        const z = Math.sin(angle) * 1.8 - 1.5;

        return {
          label,
          index,
          position: [x, y, z] as [number, number, number],
        };
      }),
    []
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const t = state.clock.getElapsedTime();
    group.rotation.y = Math.sin(t * 0.18) * 0.18;
    group.position.y = Math.sin(t * 0.24) * 0.18 - 0.3;
  });

  return (
    <group ref={groupRef}>
      {cards.map((card) => (
        <ToolCard key={card.label} {...card} />
      ))}
    </group>
  );
};

const SignalOrb = ({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) {
      return;
    }

    const t = state.clock.getElapsedTime() * 0.7;
    mesh.position.y = position[1] + Math.sin(t + position[0]) * 0.18;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} />
    </mesh>
  );
};

const TechStack = () => {
  return (
    <div className="techstack" id="toolkit">
      <h2>Security Toolkit</h2>
      <Canvas
        camera={{ position: [0, 0.5, 15], fov: 34, near: 0.1, far: 100 }}
        className="tech-canvas"
        dpr={[1, 1.4]}
      >
        <color attach="background" args={["#050c12"]} />
        <fog attach="fog" args={["#050c12", 18, 28]} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[8, 8, 10]} intensity={2.1} color="#d5fff1" />
        <pointLight position={[-7, 3, 8]} intensity={40} color="#2ae8aa" />
        <pointLight position={[7, -2, 5]} intensity={20} color="#6fe7ff" />
        <SignalOrb position={[-5.5, 2.5, -4]} color="#2ae8aa" scale={0.9} />
        <SignalOrb position={[4.8, -1.8, -5]} color="#6fe7ff" scale={0.7} />
        <ToolCloud />
        <Environment
          files={publicAssetUrl("models/char_enviorment.hdr")}
          environmentIntensity={0.45}
        />
      </Canvas>
      <div className="toolkit-copy">
        <p>
          Hands-on tooling across SOC monitoring, log analysis, endpoint
          investigations, network diagnostics, and incident response support.
        </p>
        <div className="toolkit-tags">
          {profile.toolkit.slice(0, 8).map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
