import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('orange')
});

const mesh = new THREE.Mesh(geometry, material);

mesh.position.x = 200;
mesh.translateZ(200);
mesh.name = 'cube';

const pos = new THREE.Vector3();
mesh.getWorldPosition(pos);
console.log('pos', pos);

export default mesh;
