import * as THREE from "three";

export function getPointLight(intensity) {
  return new THREE.PointLight("yellow", intensity);
}
