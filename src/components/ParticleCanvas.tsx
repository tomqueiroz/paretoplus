import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Nodes
    const nodeCount = 120;
    const positions: THREE.Vector3[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.025, 8, 8);

    const purpleMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const limeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0x888888, opacity: 0.5, transparent: true });

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      );
      positions.push(pos);
      const mat = i % 5 === 0 ? purpleMat : i % 7 === 0 ? limeMat : whiteMat;
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      // scene.add(mesh); // balls removed — lines only
    }

    // Edges (connect nearby nodes)
    const edgePositions: number[] = [];
    const threshold = 2.8;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (positions[i].distanceTo(positions[j]) < threshold) {
          edgePositions.push(positions[i].x, positions[i].y, positions[i].z);
          edgePositions.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xaaaaaa, opacity: 0.18, transparent: true });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // Ambient node velocities
    const velocities = positions.map(() => new THREE.Vector3(
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.001,
    ));

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Drift nodes
      positions.forEach((pos, i) => {
        pos.add(velocities[i]);
        if (Math.abs(pos.x) > 6) velocities[i].x *= -1;
        if (Math.abs(pos.y) > 4) velocities[i].y *= -1;
        if (Math.abs(pos.z) > 2) velocities[i].z *= -1;
      });

      // Update edge geometry
      const newEdgePos: number[] = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (positions[i].distanceTo(positions[j]) < threshold) {
            newEdgePos.push(positions[i].x, positions[i].y, positions[i].z);
            newEdgePos.push(positions[j].x, positions[j].y, positions[j].z);
          }
        }
      }
      edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(newEdgePos, 3));

      // Camera gentle parallax
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
