import * as THREE from 'three';

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, 2000);
shape.lineTo(-1500, 3000);
shape.lineTo(-3000, 2000);
shape.lineTo(-3000, 0);

const windowPath = new THREE.Path();
windowPath.moveTo(-600, 400);
windowPath.lineTo(-600, 1600);
windowPath.lineTo(-2400, 1600);
windowPath.lineTo(-2400, 400);
shape.holes.push(windowPath);

const texture = new THREE.TextureLoader().load('./zhuan.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 0.0005;
texture.repeat.y = 0.0005;
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.ExtrudeGeometry(shape, { depth: 100});

const material = new THREE.MeshLambertMaterial({map: texture, aoMap: texture, side: THREE.FrontSide});

const sideWall = new THREE.Mesh(geometry, material);

export default sideWall;