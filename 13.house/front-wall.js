import * as THREE from 'three';

const shape = new THREE.Shape();
shape.moveTo(1900, 130);
shape.lineTo(1900, 2100);
shape.lineTo(-1900, 2100);
shape.lineTo(-1900, 130);

const doorPath = new THREE.Path();
doorPath.moveTo(-800, 130);
doorPath.lineTo(-800, 1300);
doorPath.lineTo(-1600, 1300);
doorPath.lineTo(-1600, 130);
shape.holes.push(doorPath);

const windowPath = new THREE.Path();
windowPath.moveTo(400, 1200);
windowPath.lineTo(1200, 1200);
windowPath.lineTo(1200, 400);
windowPath.lineTo(400, 400);
shape.holes.push(windowPath);

const geometry = new THREE.ExtrudeGeometry(shape, { depth: 100});

const texture = new THREE.TextureLoader().load('./zhuan.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 0.0005;
texture.repeat.y = 0.0005;
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshLambertMaterial({map: texture, aoMap: texture});

const sideWall = new THREE.Mesh(geometry, material);

sideWall.translateZ(1400);

export default sideWall;