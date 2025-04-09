import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(100000, 100000);

const texture = new THREE.TextureLoader().load('./grass.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(20, 20);


const material = new THREE.MeshLambertMaterial({ map: texture, aoMap: texture});

const grass = new THREE.Mesh(geometry, material);
grass.rotateX(-Math.PI / 2);
grass.position.y = -150;

export default grass;