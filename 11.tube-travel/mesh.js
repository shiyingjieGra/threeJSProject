import * as THREE from 'three';

const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60),
    new THREE.Vector3(100, 80, 100),
    new THREE.Vector3(60, 60, 100),
    new THREE.Vector3(-40, -80, 100),
    new THREE.Vector3(-120, -20, 90),
    new THREE.Vector3(-100, 20, 90),
]);

const geometry = new THREE.TubeGeometry(curve, 100, 5, 30, true);

const texture = new THREE.TextureLoader().load('./guandao.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = 30;
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, aoMap: texture});

const mesh = new THREE.Mesh(geometry, material);

export const tubePoints = curve.getSpacedPoints(2000);

export default mesh;