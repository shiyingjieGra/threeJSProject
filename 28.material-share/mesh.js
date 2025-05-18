import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export default function loadTree(callback) {
  loader.load('./tree/tree.gltf', function (gltf) {
    console.log('gltf', gltf);
    gltf.scene.traverse(item => {
      if (item.isMesh) {
        console.log('item', item);
      }
    })
    gltf.scene.scale.set(10, 10, 10);
    callback(gltf);
  })
}