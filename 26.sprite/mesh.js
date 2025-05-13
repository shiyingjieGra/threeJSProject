import * as THREE from 'three';

const group = new THREE.Group();

const spriteMaterial = new THREE.SpriteMaterial({
  color: 'red'
});

const sprite = new THREE.Sprite(spriteMaterial);

group.add(sprite);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 'blue'});

const box = new THREE.Mesh(geometry, material);
box.position.y = 2;
group.add(box);

export default group;