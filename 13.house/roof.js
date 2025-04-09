import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('./wapian.png');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = 4;
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.BoxGeometry(4000, 2150, 100);

const material = new THREE.MeshLambertMaterial({ map: texture, aoMap: texture,});

const roof = new THREE.Mesh(geometry, material);

roof.position.set(0, 2620, -870);
roof.rotateX(56 / 180 * Math.PI);

export default roof;