import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const geometry = new THREE.BoxGeometry(4000, 2150, 100);

const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('red')});

const roof = new THREE.Mesh(geometry, material);

roof.position.set(0, 2600, -870);

export default roof;