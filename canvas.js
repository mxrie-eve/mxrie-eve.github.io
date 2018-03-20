// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);

// renderer
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('acanvas'), antialias: true});
renderer.setClearColor(0x00204A);
renderer.setSize(window.innerWidth, window.innerHeight);

// events
window.addEventListener( 'resize', onWindowResize, false );  

// lights
const ambient_light = new THREE.AmbientLight(0xffffff, 0.5);
const point_light = new THREE.PointLight(0xffffff, 0.5);
scene.add(ambient_light, point_light);

// planet geometry
//var geometry = new THREE.CubeGeometry(100, 100, 100);
//var geometry = new THREE.SphereGeometry(100, 10, 10);
const planet_geometry = new THREE.DodecahedronGeometry(10, 1);
//const planet_material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
const planet_material = new THREE.MeshBasicMaterial({color: 0xF3FFE2, wireframe: true}); 
const planet_mesh = new THREE.Mesh(planet_geometry, planet_material);
planet_mesh.position.set(0, 0, -75);

scene.add(planet_mesh);

const randomNumberInRange = (min, max) => Math.random() * (max - min) + min

const stars = new THREE.Group()
const geometry = new THREE.BoxGeometry(10.0, 10.0, 10.0);
const material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});

const radius     = 3000;
const interval = 0.15;

for (let i = 0 ; i < 2 *Math.PI; i += interval) {
  const angle1 = i;

  for (let j = 0; j < Math.PI; j += interval) {
    const angle2 = j;

    const star_mesh = new THREE.Mesh(geometry, material);

    star_mesh.position.x = radius * Math.sin(angle2) * Math.cos(angle1) * (Math.random() + 0.5)
    star_mesh.position.y = radius * Math.sin(angle2) * Math.sin(angle1) * (Math.random() + 0.5)
    star_mesh.position.z = radius * Math.cos(angle2)

    star_mesh.rotation.x = Math.random();
    star_mesh.rotation.y = Math.random();
    star_mesh.rotation.z = Math.random();

    stars.add(star_mesh);
  }
}

scene.add(stars);

// inital rendering
requestAnimationFrame(render);
// render loop
function render() {
    // planet movement
    planet_mesh.rotation.x += 0.001;
    planet_mesh.rotation.y += 0.005;

    // stars movement
	stars.rotation.x -= 0.0005
	stars.rotation.y -= 0.0005

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
