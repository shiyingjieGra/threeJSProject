import * as THREE from 'three';

const arc = new THREE.EllipseCurve(0, 0, 50, 50);
const pointList = arc.getPoints(12);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointList);

const material = new THREE.PointsMaterial({
    color: new THREE.Color('red'),
    size: 3
});

const mesh = new THREE.Points(geometry, material);

export default mesh;

export function renderEllipse ({ type = 'points', xWidth = 100, yWidth = 50, pointNum = 20, pointSize = 3, startRange = 0, endRange = 2, controlPointY = 50, controlPointX = 50}) {
    const arc = new THREE.EllipseCurve(0, 0, xWidth, yWidth, startRange * Math.PI, endRange * Math.PI);
    const pointList = arc.getPoints(pointNum);

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(pointList);

    if (type === 'points') {
        const material = new THREE.PointsMaterial({
            color: new THREE.Color('red'),
            size: pointSize
        });

        const mesh = new THREE.Points(geometry, material);

        return mesh;
    } else if (type === 'line') {
        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color('red')
        });
    
        const mesh = new THREE.Line(geometry, material);

        return mesh;
    } else if (type === 'sinLine') {
        const arr = [
            new THREE.Vector2(-100, 0),
            new THREE.Vector2(-50, 50),
            new THREE.Vector2(0, 0),
            new THREE.Vector2(50, -50),
            new THREE.Vector2(100, 0)
        ];
        const curve = new THREE.SplineCurve(arr);
        const pointList = curve.getPoints(pointNum);

        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(pointList);

        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color('blue')
        })

        const line = new THREE.Line(geometry, material);
        return line;
    } else if (type === 'sinPoints') {
        const arr = [
            new THREE.Vector2(-100, 0),
            new THREE.Vector2(-50, 50),
            new THREE.Vector2(0, 0),
            new THREE.Vector2(50, -50),
            new THREE.Vector2(80, -80),
            new THREE.Vector2(100, 0)
        ];
        const curve = new THREE.SplineCurve(arr);
        const pointList = curve.getPoints(pointNum);

        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(pointList);

        const materialLine = new THREE.LineBasicMaterial({
            color: new THREE.Color('blue')
        })

        const line = new THREE.Line(geometry, materialLine);

        const material = new THREE.PointsMaterial({
            color: new THREE.Color('green'),
            size: pointSize
        })

        const points = new THREE.Points(geometry, material);
        line.add(points);
        
        // 创建原始点与原始线
        const initPointLine = createInitPointLine(arr);
        line.add(...initPointLine);
        return line;
    } else if (type === 'quadraticBezierCurve') {
        const arr = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(controlPointX, controlPointY),
            new THREE.Vector2(100, 0)
        ];

        const curve = new THREE.QuadraticBezierCurve(...arr);
        const pointList = curve.getPoints(pointNum);

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setFromPoints(pointList);

        const lineMaterial = new THREE.LineBasicMaterial({ color: new THREE.Color('red') });

        const line = new THREE.Line(lineGeometry, lineMaterial);

        // 添加关键点辅助线
        const initPointLine = createInitPointLine(arr);
        line.add(...initPointLine);

        return line;
    } else if (type === 'cubicBezierCurve') {
        const arr = [
            new THREE.Vector3(-100, 0, 0),
            new THREE.Vector3(50, 100, 0),
            new THREE.Vector3(100, 0, 100),
            new THREE.Vector3(100, 0, 0)
        ];

        const curve = new THREE.CubicBezierCurve3(...arr);
        const pointList = curve.getPoints(pointNum);

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setFromPoints(pointList);

        const lineMaterial = new THREE.LineBasicMaterial({color: new THREE.Color('red')});

        const line = new THREE.Line(lineGeometry, lineMaterial);

        const initPointLine = createInitPointLine(arr);
        line.add(...initPointLine);
        return line;
    } else if (type === 'curvePath') {
        const line1 = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(100, 100)
        ];
        const line2 = [
            new THREE.Vector2(-100, 100),
            new THREE.Vector2(0, 0),
        ]
        const ellipseCurve = new THREE.EllipseCurve(0, 100, 100, 100, 0, Math.PI);
        const line1Curve = new THREE.LineCurve(...line1);
        const line2Curve = new THREE.LineCurve(...line2);

        const curvePath = new THREE.CurvePath();

        curvePath.add(line1Curve);
        curvePath.add(ellipseCurve);
        curvePath.add(line2Curve);
        const pointList = curvePath.getPoints(pointNum);
        const geometry = new THREE.BufferGeometry().setFromPoints(pointList);
        const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: new THREE.Color('red')}));
        return line;
    }
}

function createInitPointLine (initArray) {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(initArray);

    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: new THREE.Color('white')}));
    const point = new THREE.Points(geometry, new THREE.PointsMaterial({color: new THREE.Color('white'), size: 10}));
    return [line, point];
}