import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const spriteMaterial = new THREE.SpriteMaterial({ map: textureLoader.load('snow.png') });

const group = new THREE.Group();
for (let index = 0; index < 10000; index++) {
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(
    1000 * Math.random(),
    1000 * Math.random(),
    1000 * Math.random()
  );
  group.add(sprite);
}

const clock = new THREE.Clock();
function render () {
  const delta = clock.getDelta();
  group.children.forEach(sprite => {
    sprite.position.y -= delta * 10;
    if (sprite.position.y < 0) {
      sprite.position.y = 1000;
      sprite.position.x = 1000 * Math.random();
      sprite.position.z = 1000 * Math.random();
    }
  })
  requestAnimationFrame(render);
}

render();

export default group;