// "Een script om de mascotte in 3D te tonen in de browser, semantisch correct met gescheiden HTML, CSS en JavaScript. Gebruik Three.js en STLLoader." Tool: ChatGPT Plus (GPT-4.5) (11-juni-2025)– https://chat.openai.com 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfefefe);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer').appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 50, 100).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0x888888));

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const loader = new THREE.STLLoader();
loader.load('mascotte-test.stl', function (geometry) {
  const material = new THREE.MeshPhongMaterial({ color: 0xffc0cb });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(0.5, 0.5, 0.5);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);
}, undefined, function (error) {
  console.error('Error loading STL:', error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();