let direction = 1;

export const cameraXRotationMove = ({scene}) => {
  const cameraXRotation = scene.getObjectByName("cameraXRotation");
  if(cameraXRotation.rotation.x < 0) {
    direction = 1;
  } else {
    direction = -1;
  }

  cameraXRotation.rotation.x += 0.01 * direction;

  if(cameraXRotation.rotation.x > Math.PI) {
    cameraXRotation.rotation.x = Math.PI;
  }

  if(cameraXRotation.rotation.x < -Math.PI) {
    cameraXRotation.rotation.x = -Math.PI;
  }
};
