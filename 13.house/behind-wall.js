import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('./zhuan.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = 2;
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.BoxGeometry(4000, 2000, 100);
const material = new THREE.MeshLambertMaterial({ map: texture, aoMap: texture, side: THREE.FrontSide });

const behindWall = new THREE.Mesh(geometry, material);
behindWall.translateY(1150);
behindWall.translateZ(-1450);

export default behindWall;
