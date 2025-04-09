import * as THREE from 'three';

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(200, 0);
shape.lineTo(200, -100);
shape.lineTo(400, -100);
shape.lineTo(400, -200);
shape.lineTo(600, -200);
shape.lineTo(600, -300);
shape.lineTo(0, -300);

const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 800
});

const texture = new THREE.TextureLoader().load('./shuini.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 0.001;
texture.repeat.y = 0.001;
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshLambertMaterial({map: texture, aoMap: texture});

const doorstep = new THREE.Mesh(geometry, material);

doorstep.rotateY(-Math.PI / 2);
doorstep.position.z = 1500;
doorstep.position.y = 150;
doorstep.position.x = -800;

export default doorstep;
