import * as THREE from "three";

export function getSphere(size) {
  const geometry = new THREE.SphereGeometry(size, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: "white" });
  return new THREE.Mesh(geometry, material);
}

export function getBox(w, h, d) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshPhongMaterial({ color: "gray" });
  return new THREE.Mesh(geometry, material);
}

export function getPlane(size) {
  const geometry = new THREE.PlaneGeometry(size, size);
  const material = new THREE.MeshPhongMaterial({
    color: "gray",
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
