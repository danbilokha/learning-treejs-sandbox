import * as THREE from "three";
import * as datGui from "dat.gui";
import * as OrbitControls from "./OrbitControls";
import { update, slowUpdate } from "./update";
import { getSphere, getBoxGrid, getPlane } from "./objects";
import {getPointLight, getSpotLight, getAmbientLight, getDirectionalLight} from './lights';
import { Tween } from "twinjs";

function init(fogEnabled) {
  const scene = new THREE.Scene();
  const gui = new datGui.GUI();
  const clock = new THREE.Clock();
  if (fogEnabled) {
    scene.fog = new THREE.FogExp2("white", 0.2);
  }



  // CAST
  const boxGrid = getBoxGrid(20, 2.5);
  const plane = getPlane(100);
  const sphere = getSphere(0.5);
  const light = getDirectionalLight('white', 2);
  // const ambientLight = getAmbientLight('blue', 0.5);
  // const box = getBox(1, 1, 1);
  const helper = new THREE.CameraHelper(light.shadow.camera);

  // CAST CONFIGS
  // box.position.y = box.geometry.parameters.height / 2;
  plane.name = "plane-1";
  plane.rotation.x = Math.PI / 2;

  light.position.x = 13;
  light.position.y = 10;
  light.position.z = 10;
  light.intensity = 2;
  // light.penumbra = 0.5;
  boxGrid.name = 'boxgrid';

  // GO TO STAGE
  scene.add(boxGrid);
  scene.add(plane);
  scene.add(light);
  // scene.add(ambientLight);
  light.add(sphere);
  scene.add(helper);

  // GUI
  // gui.add(light, "intensity", 0, 10);
  // gui.add(light, 'penumbra', 0, 1);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  const cameraZRotation = new THREE.Group();
  const cameraYPosition = new THREE.Group();
  const cameraZPosition = new THREE.Group();
  const cameraXRotation = new THREE.Group();
  const cameraYRotation = new THREE.Group();

  cameraZRotation.name = 'cameraZRotation';
  cameraYPosition.name = 'cameraYPosition';
  cameraZPosition.name = 'cameraZPosition';
  cameraXRotation.name = 'cameraXRotation';
  cameraYRotation.name = 'cameraYRotation';

  cameraZRotation.add(camera);
  cameraYPosition.add(cameraZRotation);
  cameraZPosition.add(cameraYPosition);
  cameraXRotation.add(cameraZPosition);
  cameraYRotation.add(cameraXRotation);
  scene.add(cameraYRotation);

  cameraXRotation.rotation.x = -Math.PI/2;
  cameraYPosition.position.y = 1;
  cameraZPosition.position.z = 50;

  

// GUI
  gui.add(cameraZPosition.position, 'z', 0, 100);
  gui.add(cameraYRotation.rotation, 'y', -Math.PI, Math.PI);
  gui.add(cameraXRotation.rotation, 'x',  -Math.PI, Math.PI);
  gui.add(cameraZRotation.rotation, 'z',  -Math.PI, Math.PI);


  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("gray");
  renderer.shadowMap.enabled = true;
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const mainDiv = document.getElementById("webgl");
  mainDiv.appendChild(renderer.domElement);
  // const TWEEN = new Tween();
  update(renderer, scene, camera, controls, clock);
  // slowUpdate(renderer, scene, camera, controls, clock);
  return scene;
}

const fogEnabled = false;
const scene = init(fogEnabled);
