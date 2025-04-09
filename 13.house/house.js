import * as THREE from 'three';
import foundation from './foundation.js';
import sideWall from './side-wall.js';
import behindWall from './behind-wall.js';
import frontWall from './front-wall.js';
import roof from './roof.js';
import doorstep from './doorstep.js';
import grass from './grass.js'

const house = new THREE.Group();

const sideWall2 = sideWall.clone();
sideWall2.rotateY(Math.PI / 2);
sideWall2.translateZ(1900);
sideWall2.translateX(1500);
sideWall2.translateY(150);

const roof2 = roof.clone();
roof2.rotateX(68 / 180 * Math.PI);
roof2.translateZ(-960);
roof2.translateY(1430);


sideWall.rotateY(Math.PI / 2);
sideWall.translateZ(-2000);
sideWall.translateX(1500);
sideWall.translateY(150);

house.add(foundation);

house.add(sideWall);
house.add(sideWall2);

house.add(behindWall);
house.add(frontWall);
house.add(roof);
house.add(roof2);

house.add(doorstep);
house.add(grass);


export default house;
