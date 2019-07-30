
let scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load('./assets/background.jpg');
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight), 0.1, 5000);

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', ()=>{
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});

// Create cubes
let geometry = new THREE.BoxGeometry(.6, .6, .6);
let materials = [];
let cube = [];

for(let i = 0; i < 27; i++){
    const material =  new THREE.MeshBasicMaterial({color: 0xf5f5f5, map: new THREE.TextureLoader().load('./assets/' +  (i) + '.png')});
    for (let i = 0; i < 6; i++){
        materials.push(material);
    }

    cube.push(new THREE.Mesh(geometry, materials));
    cube[i].name = i;
    cube[i].userData = {URL: "https://overwatch-hero-database.com/Hero/" + i};
    materials = [];
}

let altRow = 0;
let counter = 0;
let longRow = -1.5;
let shortRow = -1;
let initHeight = 3;
let lastRow = -1;
for (let i = 0; i < cube.length; i++) {
    if(altRow === 0){
        setPositionXY(i, longRow, initHeight);
        longRow += 1;
        counter++;
    } else {
        setPositionXY(i, shortRow, initHeight);
        shortRow += 1;
        counter++;
    }
    if(counter === 4 && altRow === 0) {
        altRow = 1;
        counter = 0;
        initHeight -= .85;
        shortRow = -1;
        longRow = -1.5;
    } else if(counter === 3 && altRow === 1){
        altRow = 0;
        counter = 0;
        initHeight -= .85;
        shortRow = -1;
        longRow = -1.5;
    }
}

for(let i = 0; i < geometry.faces.length; i++){
    geometry.faces[i].color.setHex(0x00ffff);
}

// add cubes to scene
for(let i = 0; i < cube.length; i++) {
    scene.add(cube[i]);
}

camera.position.z = 5;
camera.updateMatrix();
camera.updateMatrixWorld();

function setPositionXY(i, x, y){
    cube[i].position.x = x;
    cube[i].position.y = y;
}

function renderCube(i){
    let frustum = new THREE.Frustum();
    frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

    cube[i].rotation.x += 0.01;
    cube[i].rotation.y += 0.01;
    cube[i].position.y -= 0.009; // fine for 60hz refresh rate

    let pos = new THREE.Vector3(cube[i].position.x, cube[i].position.y, cube[i].position.z);
    if(!frustum.containsPoint(pos)) {
        const x = cube[i].position.x;
        cube[i].position.y = 3.3;
        cube[i].scale.set(1,1,1);
    }
}


let animate = function () {
    requestAnimationFrame(animate);

    for(let i = 0; i < cube.length; i++){
        renderCube(i);
    }
    renderer.render(scene, camera);
};

let unScale = false;
let obj;

let onDocumentMouseMove = function (event) {
    event.preventDefault();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(cube);

    if(intersects.length > 0) {
        $('html,body').css('cursor', 'pointer');
        intersects[0].object.scale.set(1.2, 1.2, 1.2);
        unScale = true;
        obj = intersects[0];
    } else {
        $('html,body').css('cursor', 'default');
        if(unScale) {
            obj.object.scale.set(1,1,1);
            unScale = false;
        }
    }

};

let onDocumentMouseDown = function (event) {
    event.preventDefault();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight) * 2 + 1;
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(cube);

    if(intersects.length > 0){
        window.open(intersects[0].object.userData.URL, '_blank');
    } else {
        //nothing
    }
};

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);

animate();