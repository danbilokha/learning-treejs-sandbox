import * as THREE from "three";

export function setupCamera(gui, scene) {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    50000
  );

  /** Camera Position */
  // X Position

  // Y Position
  const cameraYPosition = new THREE.Group();
  cameraYPosition.name = "cameraYPosition";
  cameraYPosition.position.y = 1;

  // Z Position
  const cameraZPosition = new THREE.Group();
  cameraZPosition.name = "cameraZPosition";
  cameraZPosition.position.z = 100;

  /** Camera Rotation */
  // X Rotation
  const cameraXRotation = new THREE.Group();
  cameraXRotation.name = "cameraXRotation";
  cameraXRotation.rotation.x = -Math.PI/2;

  // Y Rotation
  const cameraYRotation = new THREE.Group();
  cameraYRotation.name = "cameraYRotation";

  // Z Rotation
  const cameraZRotation = new THREE.Group();
  cameraZRotation.name = "cameraZRotation";

  /** ADD to scene */
  cameraZRotation.add(camera);
  cameraYPosition.add(cameraZRotation);
  cameraZPosition.add(cameraYPosition);
  cameraXRotation.add(cameraZPosition);
  cameraYRotation.add(cameraXRotation);

  scene.add(cameraYRotation);

  gui.add(cameraZPosition.position, "z", 0, 100);
  gui.add(cameraYRotation.rotation, "y", -Math.PI, Math.PI);
  gui.add(cameraXRotation.rotation, "x", -Math.PI, Math.PI);
  gui.add(cameraZRotation.rotation, "z", -Math.PI, Math.PI);

  return { cameraZPosition, camera };
}

export function setupOrtographicCamera(x, y, z) {
  const camera = new THREE.OrthographicCamera(-15, 15, 15, -15, 1, 1000);
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;

  return camera;
}
