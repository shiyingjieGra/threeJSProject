import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const sprite = new THREE.SpriteMaterial({
  map: loader.load('./snow.png')
});

const snows = new THREE.Group();

function createSnow() {
  const snow = new THREE.Sprite(sprite);
  const x = -1500 + 3000 * Math.random();
  const y = 1000 * Math.random();
  const z = -1500 + 3000 * Math.random();
  snow.position.set(x, y, z);
  snow.scale.set(5, 5, 5);
  snows.add(snow);
}

for (let index = 0; index < 1000; index++) {
  createSnow();
}

function animation () {
  snows.children.forEach(snow => {
    snow.position.y -= 0.5;
    if (snow.position.y < 0) {
      snow.position.y = 500;
    }
  });
  requestAnimationFrame(animation);
}

animation();

export default snows;