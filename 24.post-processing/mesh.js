import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// function createMesh(color, x) {
//   const geometry = new THREE.DodecahedronGeometry(100);
//   const material = new THREE.MeshPhongMaterial({ color: new THREE.Color(color)});
//   const mesh = new THREE.Mesh(geometry, material);
//   mesh.position.x = x;
//   return mesh;
// }

// const mesh = new THREE.Group();
// const mesh1 = createMesh('red', 0);
// const mesh2 = createMesh('blue', 300);
// const mesh3 = createMesh('green', -300);

// mesh.add(mesh1, mesh2, mesh3);
// export default mesh;

const group = new THREE.Group();
const loader = new GLTFLoader();
loader.load('./Michelle.gltf', function (gltf) {
  console.log(gltf);
  group.add(gltf.scene);
  gltf.scene.scale.set(150, 150, 150);
  gltf.scene.traverse(obj => {
    if (obj.isMesh) {
      obj.target = gltf.scene;
    }
  })
});

export default group;
