import * as THREE from 'three';

const shape = new THREE.Shape();
shape.moveTo(2000, 0);
shape.lineTo(2000, 2000);
shape.lineTo(-2000, 2000);
shape.lineTo(-2000, 0);

const doorPath = new THREE.Path();
doorPath.moveTo(-800, 0);
doorPath.lineTo(-800, 1200);
doorPath.lineTo(-1600, 1200);
doorPath.lineTo(-1600, 0);
shape.holes.push(doorPath);

const windowPath = new THREE.Path();
windowPath.moveTo(400, 1200);
windowPath.lineTo(1200, 1200);
windowPath.lineTo(1200, 400);
windowPath.lineTo(400, 400);
shape.holes.push(windowPath);

const geometry = new THREE.ExtrudeGeometry(shape, { depth: 100});

const material = new THREE.MeshLambertMaterial({color: new THREE.Color('lightgrey')});

const sideWall = new THREE.Mesh(geometry, material);

sideWall.translateZ(1400);

export default sideWall;