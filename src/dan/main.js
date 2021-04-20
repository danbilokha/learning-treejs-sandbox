import * as datGui from "dat.gui";
import * as THREE from "three";
import * as OrbitControls from "./helpers/OrbitControls";
import {
  boxGridMove,
  cameraZPositionMove,
  cameraZRotationMove,
  cameraXRotationMove,
} from "./animate";
import { getBoxGrid, getPlane } from "./creators/objects";
import { setupCamera } from "./setupCameras";
import { setupAmbientLight, setupDirectionalLight } from "./setupLights";
import { update, updatePhase } from "./update/update";

function init(fogEnabled) {
  const scene = new THREE.Scene();
  if (fogEnabled) {
    scene.fog = new THREE.FogExp2("white", 0.2);
  }
  const gui = new datGui.GUI();
  const clock = new THREE.Clock();

  const plane = getPlane(1000);
  plane.rotation.x = Math.PI / 2;

  const { x: lightPositionX, y: lightPositionY, z: lightPositionZ } = {
    x: 15,
    y: 10,
    z: 10,
  };
  const light = setupDirectionalLight({
    lightPositionX,
    lightPositionY,
    lightPositionZ,
    gui,
  });
  const helper = new THREE.CameraHelper(light.shadow.camera);

  const ambientLight = setupAmbientLight({
    lightPositionX: 0,
    lightPositionY: 5,
    lightPositionZ: 0,
  });

  const boxGrid = getBoxGrid(20, 2.5);
  boxGrid.name = "boxGrid";

  scene.add(light);
  scene.add(helper);
  scene.add(ambientLight);
  scene.add(plane);
  scene.add(boxGrid);

  const { camera } = setupCamera(gui, scene);

  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("gray");

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const mainDiv = document.getElementById("webgl");
  mainDiv.appendChild(renderer.domElement);

  update({
    twin,
    renderer,
    scene,
    camera,
    controls,
    clock,
    fns: [boxGridMove, cameraZPositionMove],
  });

  updatePhase({
    twin,
    renderer,
    scene,
    camera,
    controls,
    clock,
    speed: 120,
    fns: [cameraZRotationMove],
  });

  return scene;
}

let fogEnabled = false;
const scene = init(fogEnabled);
