import * as THREE from 'three';

export function renderGeometry ({ type = 'latheGeometry', pointNum = 20, radius = 20, radialSegments = 20 }) {
    if (type === 'latheGeometry') {
        const pointsArr = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(50, 50),
            new THREE.Vector2(20, 80),
            new THREE.Vector2(0, 150)
        ];
        const geometry = new THREE.LatheGeometry(pointsArr, pointNum);

        const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('white'), side: THREE.DoubleSide});

        const mesh = new THREE.Mesh(geometry, material);

        const pointLine = renderPointLine(pointsArr);
        mesh.add(...pointLine);
        return mesh;
    } else if (type === 'tubeGeometry') {
        const arr = [
            new THREE.Vector3(-100, 0, 0),
            new THREE.Vector3(50, 100, 0),
            new THREE.Vector3(100, 0, 100),
            new THREE.Vector3(100, 0, 0)
        ];

        const curve = new THREE.CubicBezierCurve3(...arr);

        const geometry = new THREE.TubeGeometry(curve, pointNum, radius, radialSegments)

        const material = new THREE.MeshLambertMaterial({ color: new THREE.Color('white'), side: THREE.DoubleSide, wireframe: true});

        const mesh = new THREE.Mesh(geometry, material);

        const pointLine = renderPointLine(arr);
        mesh.add(...pointLine);
        return mesh;
    } else if (type === 'shapeGeometry') {
        // const pointsArr = [
        //     new THREE.Vector2(100, 0),
        //     new THREE.Vector2(50, 20),
        //     new THREE.Vector2(0, 0),
        //     new THREE.Vector2(0, 50),
        //     new THREE.Vector2(50, 100)
        // ];

        const shape = new THREE.Shape();

        shape.moveTo(100, 0);
        shape.lineTo(50, 20);
        shape.lineTo(0, 0);
        shape.lineTo(0, 50);
        shape.lineTo(50, 100);

        const path = new THREE.Path();
        path.arc(50, 50, 10);
        shape.holes.push(path);

        const geometry = new THREE.ShapeGeometry(shape);

        const material = new THREE.MeshLambertMaterial({color: new THREE.Color('lightgreen')});

        const mesh = new THREE.Mesh(geometry, material);
        return mesh
    } else if (type === 'extrudeGeometry') {
        const shape = new THREE.Shape();

        shape.moveTo(100, 0);
        shape.lineTo(50, 20);
        shape.lineTo(0, 0);
        shape.lineTo(0, 50);
        shape.lineTo(50, 100);

        const path = new THREE.Path();
        path.arc(50, 50, 10);
        shape.holes.push(path);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 100
        });
        const material = new THREE.MeshLambertMaterial({color: new THREE.Color('lightgreen')});
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }
}

function renderPointLine (arr) {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(arr);

    const material = new THREE.LineBasicMaterial({ color: new THREE.Color('red') });
    const line = new THREE.Line(geometry, material);

    const point = new THREE.Points(geometry, new THREE.PointsMaterial({ color: new THREE.Color('red'), size: 4}));
    return [line, point];
}