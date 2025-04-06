import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('./storm.png');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 2);

const geometry = new THREE.CylinderGeometry( 30, 50, 1000, 32, 32, true);

const material = new THREE.MeshBasicMaterial({
    transparent: true,
    alphaMap: texture,
    side: THREE.BackSide
});

const tunnel = new THREE.Mesh(geometry, material);

export default tunnel;