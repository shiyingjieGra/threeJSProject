import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


const group = new THREE.Group();

const loader = new GLTFLoader();

let action = null;
let actionMap = {};
loader.loadAsync('./Horse.gltf').then((gltf) => {
  console.log('gltf', gltf);
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.scale.set(30, 30, 30);
  group.add(gltf.scene);

  const mixer = new THREE.AnimationMixer(gltf.scene);

  const actions = gltf.animations.map(clip => clip.name);

  actionMap = gltf.animations.reduce((prev, cur) => {
    prev[cur.name] = mixer.clipAction(cur);
    return prev;
  }, {});

  console.log('actionMap', actionMap);

  const controlObj = {
    action: 'Jump',
    isStop: true,
    speed: 1,
  }
  const gui = new GUI();
  // gui.add(controlObj, 'action', actions).name('动作').onChange(value => {
  //   console.log(value, action);
  //   if (action) {
  //     action.stop();
  //   }
  //   action = actionMap[value];
  //   action.loop = THREE.LoopRepeat
  //   if (value === 'Death') {
  //     action.loop = THREE.LoopOnce;
  //   }
  //   action.play();
  // });

  gui.add(controlObj, 'isStop').name('暂停').onChange(value => {
    if (action) {
      action.paused = value;
    }
  });

  gui.add(controlObj, 'speed', 0, 10).name('速度').step(1).onChange(value => {
    if (action) {
      action.setEffectiveTimeScale(value);
    }
  });

  const clock = new THREE.Clock();
  function render() {
    requestAnimationFrame(render);
    const delta = clock.getDelta();
    mixer.update(delta);
  }

  render();

});

let currentName = '';
function setAction(actionName) {
  if (currentName === actionName) {
    return false;
  }
  if (action) {
    const action2 = actionMap[actionName];
    action.crossFadeTo(action2, 2);
  } else {
    action = actionMap[actionName];
    action.play();
  }
}

function getAction (code) {
  let actionName = '';
  switch (code) {
    case 'ArrowUp':
      actionName = 'WalkSlow';
      break;
    case 'Space':
      actionName = 'Jump';
    default:
      break;
  }
  return actionName;
}

window.document.addEventListener('keydown', (e) => {
  const actionName = getAction(e.code);
  setAction(actionName);
  console.log('keydown', e);
});

window.document.addEventListener('keyup', (e) => {
  console.log('keyup', e);
  const actionName = getAction(e.code);
  if (actionName === currentName) {
    action.stop();
    action = null;
  }
});

export default group;