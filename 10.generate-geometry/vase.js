import * as THREE from 'three';

export function renderGeometry ({bottomWidth, bottom2BottomMiddleHeight, bottomMiddleWidth, bottomMiddle2TopMiddleHeight, topMiddleWidth, topMiddle2TopHeight, topWidth}) {
    const pointList = [
        new THREE.Vector3(bottomWidth, 6, 0),
        new THREE.Vector3(bottomMiddleWidth, bottom2BottomMiddleHeight, 0),
        new THREE.Vector3(topMiddleWidth, bottomMiddle2TopMiddleHeight, 0),
        new THREE.Vector3(topWidth, topMiddle2TopHeight, 0)
    ];

    // 使用贝塞尔曲线生成花瓶的曲线
    const curve = new THREE.CubicBezierCurve3(...pointList);

    let pointsArr = curve.getPoints(200);
    pointsArr.unshift(new THREE.Vector3(bottomWidth, 0, 0));

    // 生成花瓶内部曲线
    let innerPointsArr = [];
    for (let i = 0; i < pointsArr.length; i++) {
        innerPointsArr.push(new THREE.Vector3(pointsArr[i].x - 1, pointsArr[i].y, pointsArr[i].z));
    }

    // 顶部收口
    innerPointsArr.push(new THREE.Vector3(pointsArr[pointsArr.length - 1].x + 1.5, pointsArr[pointsArr.length - 1].y + 1.5, 0));
    innerPointsArr.push(new THREE.Vector3(pointsArr[pointsArr.length - 1].x, pointsArr[pointsArr.length - 1].y, 0));
    // 底部添加底盘
    innerPointsArr.unshift(new THREE.Vector3(0, 2, 0));
    pointsArr.unshift(new THREE.Vector3(bottomWidth - 1, -1, 0));

    const innerGeometry = new THREE.LatheGeometry(innerPointsArr, 20);
    const innerMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('white'), side: THREE.DoubleSide, shininess: 10000});

    const geometry = new THREE.LatheGeometry(pointsArr, 20);

    const texture = new THREE.TextureLoader().load('./huaping.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, shininess: 10000});

    const mesh = new THREE.Mesh(geometry, material);
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);

    const pointLine = renderPointLine(pointList);
    // mesh.add(...pointLine);
    mesh.add(innerMesh);
    return mesh;
}

function renderPointLine (arr) {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(arr);

    const material = new THREE.LineBasicMaterial({ color: new THREE.Color('red') });
    const line = new THREE.Line(geometry, material);

    const point = new THREE.Points(geometry, new THREE.PointsMaterial({ color: new THREE.Color('red'), size: 4}));
    return [line, point];
}