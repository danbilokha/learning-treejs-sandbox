import * as THREE from "three";

export function getPointLight(intensity, color) {
  return new THREE.PointLight(color, intensity);
}
