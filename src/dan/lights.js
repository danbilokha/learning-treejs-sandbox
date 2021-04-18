import * as THREE from "three";

export function getPointLight(intensity) {
  const pointLight = new THREE.PointLight("yellow", intensity);
  pointLight.castShadow = true;
  return pointLight;
}

export function getSpotLight(intensity) {
  const pointLight = new THREE.SpotLight("yellow", intensity);
  pointLight.castShadow = true;
  return pointLight;
}

export function getDirectionalLight(intensity) {
  const directionalLight = new THREE.DirectionalLight("yellow", intensity);
  directionalLight.castShadow = true;
  

  return directionalLight;
}

export function getAmbientLight(intensity) {
  const ambientLight = new THREE.AmbientLight("blue", intensity);

  return ambientLight;
}
