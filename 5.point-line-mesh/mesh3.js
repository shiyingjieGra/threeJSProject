/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-04 00:07:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-04 00:11:50
 * @FilePath: \threeJSProject\5.point-line-mesh\mesh3.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three';

const geometry = new THREE.CylinderGeometry(50, 50, 60, 6, 2);

const material = new THREE.MeshBasicMaterial({color: new THREE.Color('blue'), wireframe: true});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;