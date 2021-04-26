// import {firstOverallSteps} from './firstOverallSteps';
// firstOverallSteps();

import * as dat from "dat.gui";
import * as THREE from "three";
import * as OrbitControls from "./helpers/OrbitControls";
import concrete from "./assets/textures/concrete.jpg";
// import checkerboard from './assets/textures/checkerboard.jpg';
import fingerprints from "./assets/textures/fingerprints.jpg";
import nx from "./assets/cubemap/nx.jpeg";
import ny from "./assets/cubemap/ny.jpeg";
import nz from "./assets/cubemap/nz.jpeg";
import px from "./assets/cubemap/px.jpeg";
import py from "./assets/cubemap/py.jpeg";
import pz from "./assets/cubemap/pz.jpeg";
import scratch from "./assets/textures/scratch.jpg";

console.log("Needed so it works", OrbitControls);

function init() {
  var scene = new THREE.Scene();

  // initialize objects
  var planeMaterial = getMaterial("basic", "rgb(255, 255, 255)");
  var plane = getPlane(planeMaterial, 30, 60);
  plane.name = 'plane-1';

  // manipulate objects
  plane.rotation.x = Math.PI / 2;
  plane.rotation.z = Math.PI / 4;

  // add objects to the scene
  scene.add(plane);

  // camera
  var camera = new THREE.PerspectiveCamera(
    45, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000 // far clipping plane
  );
  camera.position.z = 20;
  camera.position.x = 0;
  camera.position.y = 5;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("webgl").appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);

  return scene;
}

function getPlane(material, size, segments) {
  var geometry = new THREE.PlaneGeometry(size, size, segments, segments);

  material.side = THREE.DoubleSide;

  var obj = new THREE.Mesh(geometry, material);
  obj.receiveShadow = true;
  obj.castShadow = true;

  return obj;
}

function getMaterial(type, color) {
  var selectedMaterial;
  var materialOptions = {
    color: color === undefined ? "rgb(255, 255, 255)" : color,
    wireframe: true,
  };

  switch (type) {
    case "basic":
      selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
      break;
    case "lambert":
      selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
      break;
    case "phong":
      selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
      break;
    case "standard":
      selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
      break;
    default:
      selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
      break;
  }

  return selectedMaterial;
}

function update(renderer, scene, camera, controls) {
  controls.update();
  renderer.render(scene, camera);

  var plane = scene.getObjectByName('plane-1');
  plane.updateMatrixWorld();
  
	var planeGeo = plane.geometry;

  console.log('planeGeo', planeGeo, planeGeo.attributes.position);
  // console.log( plane.geometry.isBufferGeometry );
  const position = planeGeo.attributes.position;

  const vector = new THREE.Vector3();

   for ( let i = 0, l = position.count; i < l; i ++ ) {

      vector.fromBufferAttribute( position, i );
      vector.applyMatrix4( planeGeo.matrixWorld );
      console.log(vector);
   
   }
  

	// planeGeo.attributes.position.array.forEach(function(vertex, index) {
  //   console.log('vertex', vertex);
  //   vertex.z = Math.random();
  // });

  requestAnimationFrame(function () {
    update(renderer, scene, camera, controls);
  });
}

var scene = init();
