import * as THREE from 'three';

const group = new THREE.Group();

function createLine (type) {
  const points = [
    new THREE.Vector3(0, 0, 0),
    type === 'x' ? new THREE.Vector3(100, 0, 0) : new THREE.Vector3(0, 100, 0)
  ];
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ color: '#ffffff' });
  geometry.setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  return line;
}

group.add(createLine('x'));
group.add(createLine('y'));

function createScaleLine (type) {
  let points = [];
  for (let i = 0; i <= 100; i+= 10) {
    if (type === 'x') {
      points.push(new THREE.Vector3(i, 0, 0), new THREE.Vector3(i, -5, 0));
    } else {
      points.push(new THREE.Vector3(0, i, 0), new THREE.Vector3(-5, i, 0));
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: '#ffffff' });
  const line = new THREE.LineSegments(geometry, material);
  return line;
}

group.add(createScaleLine('x'));
group.add(createScaleLine('y'));

function createBar (dataArr) {
  const group = new THREE.Group();
  for (let index = 0; index <= dataArr.length - 1; index++) {
    const bar = new THREE.PlaneGeometry(10, dataArr[index], 1, 20);
    const position = bar.attributes.position;
    const colors = [];
    const colorA = new THREE.Color('green');
    const colorB = new THREE.Color('blue');
    const colorC = new THREE.Color('red');
    const maxHeight = 100;
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i) + dataArr[index] / 2;
      if (y <= 50) {
        const precent = y / 50;
        const color = colorA.clone().lerp(colorB, precent);
        colors.push(color.r, color.g, color.b);
      } else {
        const precent = (y - 50) / 50;
        const color = colorB.clone().lerp(colorC, precent);
        colors.push(color.r, color.g, color.b);
      }
    }
    const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide});
    bar.attributes.color = new THREE.BufferAttribute(new Float32Array(colors), 3)
    const mesh = new THREE.Mesh(bar, material);
    mesh.position.set(10 + index * 20, dataArr[index] / 2, 0);
    group.add(mesh);
  }
  return group;
}
group.add(createBar([70, 20, 100, 40, 50]));

export default group;