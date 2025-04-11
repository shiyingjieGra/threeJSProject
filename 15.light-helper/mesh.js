import * as THREE from 'three';

const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color('skyblue')});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotateX(-Math.PI / 2);
plane.position.y = -50;

const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const boxMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color('orange')});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

const box2 = box.clone();
box2.position.x = 200;

export const mesh = new THREE.Group();

mesh.add(plane, box, box2);

export function renderLight({type}) {
  let light = null
  let helper = mesh.getObjectByName('helper');
  if(helper) {
    mesh.remove(helper);
  }
  if(type === 'directionalLight') {
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(400, 500, 300);
    light.lookAt(0, 0, 0);
    helper = new THREE.DirectionalLightHelper(light, 100);
    mesh.add(helper);
  } else if (type === 'pointLight') {
    light = new THREE.PointLight(0xffffff, 1000000);
    light.name = 'light';
    light.position.set(400, 500, 300);
    light.lookAt(0, 0, 0);
    helper = new THREE.PointLightHelper(light, 100);
    mesh.add(helper);
  } else if (type === 'ambientLight') {
    light = new THREE.AmbientLight(0xffffff);
  } else if (type === 'spotLight') {
    light = new THREE.SpotLight(0xffffff, 1000000);
    light.distance = 1000;
    light.angle = Math.PI / 12;
    light.position.set(0, 800, 0);
    light.lookAt(0, 0, 0);
    helper = new THREE.SpotLightHelper(light, 100);
    mesh.add(helper);
  }
  light.name = 'light';
  if (helper) {
    helper.name = 'helper';
  }
  return light;
}
