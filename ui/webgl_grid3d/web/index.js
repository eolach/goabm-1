var Stats = require('stats-js');
const dat = require('dat.gui');


// WebGL
let canvas = document.getElementById("preview");
var renderer = new THREE.WebGLRenderer({ canvas: canvas });

var data;
function addData(data) {
	data = data;
    let geometry = new THREE.SphereGeometry( 0.5, 1, 1 );
    let material = new THREE.MeshStandardMaterial({ color: '#00ff00' });
    let sphere1 = new THREE.Mesh( geometry, material );
    scene.add( sphere1 );
    sphere1.position.set(data.X, data.Y, data.Z);
}

module.exports = { addData };

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000011);

// Add lights
scene.add(new THREE.AmbientLight(0xbbbbbb));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

var nodesGroup = new THREE.Group();
scene.add(nodesGroup);

// Helpers
var box = new THREE.Box3();
box.setFromCenterAndSize( new THREE.Vector3( 50, 50, 50 ), new THREE.Vector3( 100, 100, 100 ) );

var helper = new THREE.Box3Helper( box, 0xffff00 );
scene.add( helper );

// Setup camera
var camera = new THREE.PerspectiveCamera();
camera.far = 400000;

var tbControls = new THREE.TrackballControls(camera, renderer.domElement);
var flyControls = new THREE.FlyControls(camera, renderer.domElement);

var animate = function () {
	// frame cycle
	tbControls.update();
	flyControls.update(1);

	renderer.render(scene, camera);
	stats.update();
	requestAnimationFrame( animate );
};

var width = window.innerWidth * 80 / 100 - 20;
var height = window.innerHeight - 20;
var nodeRelSize = 1;
var nodeResolution = 8;

// Stats
var stats = new Stats();
document.body.appendChild( stats.domElement );
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '15px';
stats.domElement.style.bottom = '20px';

// Dat GUI
const gui = new dat.GUI();

function resizeCanvas() {
    if (width && height) {
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    }
}
resizeCanvas();
animate();
