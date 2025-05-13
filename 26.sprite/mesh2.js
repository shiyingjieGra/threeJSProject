import * as THREE from 'three';

const loader = new THREE.TextureLoader();
function createMesh (color, x) {
  const group = new THREE.Group();
  const geometry = new THREE.DodecahedronGeometry(1);
  const material = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;

  const spriteMaterial = new THREE.SpriteMaterial({
    map: loader.load('./sprite.png'),
  })
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.x = x;
  sprite.position.y = 2;
  group.add(mesh, sprite);
  return group;
}

const group = new THREE.Group();

const mesh1 = createMesh('red', 0);
const mesh2 = createMesh('blue', 5);
const mesh3 = createMesh('green', -5);

group.add(mesh1, mesh2, mesh3);

export default group;

