import * as THREE from "three";

export function getPointLight(color, intensity) {
  const light = new THREE.PointLight(color, intensity);
  light.castShadow = true;
  return light;
}

export function getSpotLight(color, intensity) {
  const light = new THREE.SpotLight(color, intensity);
  light.castShadow = true;
  light.shadow.bias = 0.001;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  return light;
}

export function getDirectionalLight(color, intensity) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.castShadow = true;
  light.shadow.camera.left = -40;
  light.shadow.camera.bottom = -40;
  light.shadow.camera.right = 40;
  light.shadow.camera.top = 40;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  return light;
}

export function getAmbientLight(color, intensity) {
  const light = new THREE.AmbientLight(color, intensity);

  return light;
}
