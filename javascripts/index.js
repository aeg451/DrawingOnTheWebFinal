var scene, camera, renderer, controls, particles, saturn;

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  camera.position.set(0, 0, 800);
  scene.add(camera);

  var ambientLight = new THREE.AmbientLight();
  var light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(200, 100, 200);
  light.castShadow = false;
  scene.add(ambientLight);
  scene.add(light);
  
  particles();
  saturn();

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);
}

function particles() {
  particles = new THREE.Group();
  var geometry = new THREE.TetrahedronGeometry(2, 4);
  for (var i = 0; i < 500; i ++) {
    var material = new THREE.MeshPhongMaterial({ color: 0xfff7cc , shading: THREE.FlatShading });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500);
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(particles);
    particles.add(mesh);
  }
}

function saturn() {
  saturn = new THREE.Group();
  saturn.rotation.set(0.4, 0.3, 0);
  scene.add(saturn);

  var planetGeometry = new THREE.IcosahedronGeometry(100, 5);
  var planetMaterial = new THREE.MeshPhongMaterial({ color: 0xf2ca58, shading: THREE.FlatShading });
  var planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.castShadow = true;
  planet.receiveShadow = true;
  planet.position.set(0, 40, 0);
  saturn.add(planet);

  var ringGeometry = new THREE.TorusGeometry(130, 5, 2, 30);
  var ringMeterial = new THREE.MeshStandardMaterial({ color: 0xdec19e, shading: THREE.FlatShading });
  var ring = new THREE.Mesh(ringGeometry, ringMeterial);
  ring.position.set(0, 40, 0)
  ring.rotateX(80);
  ring.castShadow = true;
  ring.receiveShadow = true;
  saturn.add(ring);

  var ringGeometry2 = new THREE.TorusGeometry(160, 15, 2, 30);
  var ring2 = new THREE.Mesh(ringGeometry2, ringMeterial);
  ring2.position.set(0, 40, 0)
  ring2.rotateX(80);
  ring2.castShadow = true;
  ring2.receiveShadow = true;
  saturn.add(ring2);

  var ringGeometry3 = new THREE.TorusGeometry(190, 5, 2, 30);
  var ring3 = new THREE.Mesh(ringGeometry3, ringMeterial);
  ring3.position.set(0, 40, 0)
  ring3.rotateX(80);
  ring3.castShadow = true;
  ring3.receiveShadow = true;
  saturn.add(ring3);
}

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.x += 0.0015;
  particles.rotation.y -= 0.0015;
  saturn.rotation.y += 0.005;
  renderer.render(scene, camera);
}

init();
animate();