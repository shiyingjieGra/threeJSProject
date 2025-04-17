import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load('./gltf1/CesiumMan.gltf', function (gltf) {
    console.log(gltf);
    mesh.add(gltf.scene);
    gltf.scene.scale.set(50, 50, 50);
    gltf.scene.traverse(obj => {
			if (obj.isMesh) {
				console.log(obj.name, obj)
				obj.material.wireframe = true;
				obj.material.color = new THREE.Color('red')
				obj.material.map = null;
			}
    })
});

loader.load('./gltf2/CesiumMan.gltf', function (gltf) {
	console.log(gltf);
	mesh.add(gltf.scene);
	gltf.scene.scale.set(50, 50, 50);
	gltf.scene.translateX(-50);
	gltf.scene.traverse(obj => {
	  if (obj.isMesh) {
		  console.log(obj.name, obj)
		  obj.material.wireframe = true;
		  obj.material.color = new THREE.Color('blue')
		}
	})
})

loader.load('./gltf3/CesiumMan.glb', function (gltf) {
	console.log(gltf);
	mesh.add(gltf.scene);
	gltf.scene.scale.set(50, 50, 50);
	gltf.scene.translateX(50);
	gltf.scene.traverse(obj => {
	  if (obj.isMesh) {
		  console.log(obj.name, obj)
		  obj.material.wireframe = true;
		  obj.material.color = new THREE.Color('green')
		}
	})
})

export default mesh;