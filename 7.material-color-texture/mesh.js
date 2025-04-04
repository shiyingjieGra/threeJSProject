import * as THREE from 'three';

// 线段
const geometryBox = new THREE.BoxGeometry(100, 100, 100);

const geometry = new THREE.EdgesGeometry(geometryBox);

const material = new THREE.LineDashedMaterial({color: new THREE.Color('red'), dashSize: 5, gapSize: 10});

const line = new THREE.Line(geometry, material);
line.computeLineDistances();


// 平面
const geometryPlane = new THREE.PlaneGeometry(100, 100);

const materialPlane = new THREE.MeshBasicMaterial({color: new THREE.Color('green'), transparent: true, opacity: 0.5});

const plane = new THREE.Mesh(geometryPlane, materialPlane)

const color = plane.material.color;
console.log('getHexString', color.getHexString());
console.log('getStyle', color.getStyle());

// 贴图
const loader = new THREE.TextureLoader();
const texture = loader.load('./diqiu.jpg');

const geometrySphere = new THREE.SphereGeometry(100);

const materialSphere = new THREE.MeshBasicMaterial({map: texture, aoMap: texture});

const sphere = new THREE.Mesh(geometrySphere, materialSphere);
texture.colorSpace = THREE.SRGBColorSpace;

// 墙面
const loaderWall = new THREE.TextureLoader();
const textureWall = loaderWall.load('./wall.jpg');

const geometryWall = new THREE.PlaneGeometry(300, 300);

const materialWall = new THREE.MeshBasicMaterial({map: textureWall, aoMap: textureWall});

const wall = new THREE.Mesh(geometryWall, materialWall);
textureWall.wrapS = THREE.RepeatWrapping;
textureWall.wrapT = THREE.RepeatWrapping;
textureWall.repeat.set(3, 3);
textureWall.colorSpace = THREE.SRGBColorSpace;

export {
    line,
    plane,
    sphere,
    wall
};