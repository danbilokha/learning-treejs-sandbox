import * as THREE from "three";
import * as datGui from "dat.gui";
import * as OrbitControls from "./OrbitControls";
import { update } from "./update";
import { getSphere, getBox, getPlane } from "./objects";
import {getPointLight} from './lights';

console.log('jul');

function init(fogEnabled) {
  const scene = new THREE.Scene();
  const gui = new datGui.GUI();
  if (fogEnabled) {
    scene.fog = new THREE.FogExp2("white", 0.2);
  }

  const box = getBox(1, 1, 1);
  box.position.y = box.geometry.parameters.height / 2;

  const plane = getPlane(20);
  plane.name = "plane-1";
  plane.rotation.x = Math.PI / 2;

  const sphere = getSphere(0.05);
  const light = getPointLight(0.5);
  light.position.y = 1.5;
  light.position.x = 1;
  light.position.z = 1;
  light.add(sphere);

  const sphere1 = getSphere(0.05);
  const light1 = getPointLight(0.5);
  light1.position.y = 1.5;
  light1.position.x = -1;
  light1.position.z = 1;
  light1.add(sphere1);

  gui.add(light, "intensity", 0, 10);
  gui.add(light.position, "y", 0, 10);
  gui.add(light.position, "x", 0, 10);

  scene.add(box);
  scene.add(plane);
  scene.add(light);
  scene.add(light1);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const renderer = new THREE.WebGLRenderer();
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
