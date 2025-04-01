import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
console.log(THREE);

const scence = new THREE.Scene();

// 创建一个100x100x100的立方体并且加入场景中
{
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('red') });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(0, 0, 0);

  scence.add(mesh);
}

// 添加点光源
{
  const pointLight = new THREE.PointLight(new THREE.Color('white'), 10000);
  pointLight.position.set(80, 80, 80);
  scence.add(pointLight);
}

// 添加环境光
{
  const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.05);
  scence.add(ambientLight);
}

// 添加参考坐标系
{
  const axesHelper = new THREE.AxesHelper(100, 100, 100);
  scence.add(axesHelper);
}

// 初始化场景
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
{
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  renderer.render(scence, camera);

  function render() {
    renderer.render(scence, camera);
    requestAnimationFrame(render);
  }
  render();

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
}
