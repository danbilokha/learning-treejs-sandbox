import * as THREE from "three";
import * as datGui from "dat.gui";
import * as OrbitControls from "./OrbitControls";
import { update } from "./update";
import { getSphere, getBoxGrid, getPlane } from "./objects";
import {getSpotLight, getDirectionalLight, getAmbientLight} from './lights';

function setupSpotLight({lightPositionX, lightPositionY, lightPositionZ, gui}) {
  const sphere = getSphere(0.35);
  const light = getSpotLight(0.5);
  
  light.intensity = 2;
  light.penumbra = 0.25;
  light.position.x = lightPositionX;
  light.position.y = lightPositionY;
  light.position.z = lightPositionZ;

  light.shadow.bias = 0.001;
  light.shadow.mapSize.width = 1024 * 2;
  light.shadow.mapSize.height = 1024 * 2;

  light.add(sphere);

  gui.add(light, "intensity", 0, 10);
  gui.add(light.position, "x", 0, 20);
  gui.add(light.position, "y", 0, 20);
  gui.add(light.position, "z", 0, 20);
  gui.add(light, "penumbra", 0, 1);

  return light;
}

function setupDirectionalLight({lightPositionX, lightPositionY, lightPositionZ, gui}) {
  const sphere = getSphere(0.35);
  const light = getDirectionalLight(1);
  
  light.penumbra = 0.25;
  light.position.x = lightPositionX;
  light.position.y = lightPositionY;
  light.position.z = lightPositionZ;

  light.shadow.bias = 0.001;
  light.shadow.mapSize.width = 1024 * 2;
  light.shadow.mapSize.height = 1024 * 2;


  light.shadow.camera.left= -10;
  light.shadow.camera.right= 10;
  light.shadow.camera.bottom= -10;
  light.shadow.camera.top= 10;

  light.add(sphere);

  gui.add(light, "intensity", 0, 10);
  gui.add(light.position, "x", 0, 20);
  gui.add(light.position, "y", 0, 20);
  gui.add(light.position, "z", 0, 20);

  return light;
}

function setupAmbientLight({lightPositionX, lightPositionY, lightPositionZ}) {
  const light = getAmbientLight(0.25);
  
  light.position.x = lightPositionX;
  light.position.y = lightPositionY;
  light.position.z = lightPositionZ;

  return light;
}

function setupCamera(x, y, z) {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    50000
  );
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;

  return camera;
}

function init(fogEnabled) {
  const scene = new THREE.Scene();
  const gui = new datGui.GUI();
  if (fogEnabled) {
    scene.fog = new THREE.FogExp2("white", 0.2);
  }

  const plane = getPlane(1000);
  plane.name = "plane-1";
  plane.rotation.x = Math.PI / 2;

  /** spotlight lightPosition */
  // const {x:lightPositionX,y: lightPositionY,z: lightPositionZ} = {x: 0, y: 10, z: 0}; 
  // const light = setupSpotLight({lightPositionX, lightPositionY, lightPositionZ, gui});
  const {x:lightPositionX,y: lightPositionY,z: lightPositionZ} = {x: 15, y: 10, z: 10}; 
  const light = setupDirectionalLight({lightPositionX, lightPositionY, lightPositionZ, gui});
  const helper = new THREE.CameraHelper(light.shadow.camera);

  const ambientLight = setupAmbientLight({lightPositionX: 0, lightPositionY: 5, lightPositionZ: 0 });

  const boxGrid = getBoxGrid(10, 1.5);

  scene.add(light);
  scene.add(helper);
  scene.add(ambientLight);
  scene.add(plane);
  scene.add(boxGrid);

  const camera = setupCamera((lightPositionX * 2) - 70, lightPositionY + 10, (lightPositionZ) - 25);
  camera.lookAt(new THREE.Vector3(lightPositionX, lightPositionY, lightPositionZ));

  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("gray");
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const mainDiv = document.getElementById("webgl");
  mainDiv.appendChild(renderer.domElement);
  update(renderer, scene, camera, controls);

  return scene;
}

let fogEnabled = false;
const scene = init(fogEnabled);
