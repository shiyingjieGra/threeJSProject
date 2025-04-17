import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load('./Horse.gltf', function (gltf) {
  console.log(gltf);
  mesh.add(gltf.scene);
  gltf.scene.traverse(obj => {
    if (obj.isMesh) {
      console.log('mesh', obj);
    }
  })
  const cylinder = gltf.scene.getObjectByName('Cylinder');
  cylinder.material.color = new THREE.Color('red');
  const cylinder2 = gltf.scene.getObjectByName('Cylinder_1');
  cylinder2.material.color = new THREE.Color('blue');
  // cylinder.material.wireframe = true;
  // cylinder2.material.wireframe = true;
  const material = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true});
  cylinder.material = material;
  cylinder2.material = material;
});

export default mesh;