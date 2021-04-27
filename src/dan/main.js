import * as dat from "dat.gui";
import * as THREE from "./three";
import * as OrbitControls from "./helpers/OrbitControls";
import * as OBJLoader from "./helpers/OBJLoader";
import particleJpg from "./assets/textures/particle.jpg";
import * as Stats from './helpers/stats';

console.log("Needed so it works", OrbitControls);
console.log("Needed so it works 2", OBJLoader);
console.log("THREE", THREE);
console.log("particleJpg", particleJpg);
console.log("Stats", Stats);

function init() {
  var scene = new THREE.Scene();
  const stats = new Stats();
  console.log('stats', Stats);
  
  document.body.appendChild(stats.dom);

  // camera
  var camera = new THREE.PerspectiveCamera(
    45, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000 // far clipping plane
  );
  camera.position.z = 30;
  camera.position.x = 0;
  camera.position.y = 1;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var particleMat = new THREE.PointsMaterial({
    color: "rgb(255, 255, 255)",
    size: 0.25,
    map: new THREE.TextureLoader().load(particleJpg),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  var particleGeo = new THREE.SphereGeometry(10, 64, 64);
  particleGeo.vertices.forEach((vertex) => {
	vertex.x += Math.random() - 0.5;
	vertex.y += Math.random() - 0.5;
	vertex.z += Math.random() - 0.5;
  })

  var particleSystem = new THREE.Points(particleGeo, particleMat);
  particleSystem.name = "particleSystem";
  scene.add(particleSystem);

  // renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor("rgb(20, 20, 20)");

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.getElementById("webgl").appendChild(renderer.domElement);

  update(renderer, scene, camera, controls, stats);

  return scene;
}

function update(renderer, scene, camera, controls, stats) {
  controls.update();
  stats.update();
  renderer.render(scene, camera);

  const particleSystem = scene.getObjectByName("particleSystem");
  particleSystem.rotation.y += 0.005;

  particleSystem.geometry.verticesNeedUpdate = true;

  requestAnimationFrame(function () {
    update(renderer, scene, camera, controls, stats);
  });
}

var scene = init();
