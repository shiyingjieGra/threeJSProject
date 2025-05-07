import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const points = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(300, 0, 0),
  new THREE.Vector3(0, 300, 0)
];

geometry.setFromPoints(points);

const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('red') });

const mesh = new THREE.Mesh(geometry, material);

const ray = new THREE.Ray();
ray.origin.set(50, 50, 100);
ray.direction.set(0, 0, -1);

const arrowHelper = new THREE.ArrowHelper(ray.direction, ray.origin, 1000, new THREE.Color('blue'));
mesh.add(arrowHelper);

const point = new THREE.Vector3();
ray.intersectTriangle(points[0], points[1], points[2], false, point);

console.log(point);

export default mesh;