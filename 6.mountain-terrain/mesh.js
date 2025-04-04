import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise'; 

const geometry = new THREE.PlaneGeometry(3000, 3000, 200, 200);
const noise2D = createNoise2D();

export function updatePosition () {

    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = noise2D(x / 300, y / 300) * 50;
        const simNum = Math.sin(Date.now() * 0.002 + x * 0.01) * 10;
        positions.setZ(i, z + simNum);
    }

    positions.needsUpdate = true;
}

// updatePosition();

const material = new THREE.MeshBasicMaterial({color: new THREE.Color('blue'), wireframe: true});

const mesh = new THREE.Mesh(geometry, material);

mesh.rotateX(Math.PI / 2);

export default mesh;