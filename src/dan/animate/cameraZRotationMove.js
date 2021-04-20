export const cameraZRotationMove = ({scene}) => {
  const cameraZPosition = scene.getObjectByName("cameraZPosition");
  const cameraZRotation = scene.getObjectByName("cameraZRotation");

  if(cameraZPosition.position.z < 40) {
    cameraZRotation.rotation.z = (cameraZRotation.rotation.z < 0 ?  Math.PI  : -Math.PI) * 0.02 * ((100 - cameraZPosition.position.z) * 0.01);
    return;
  } 

  cameraZRotation.rotation.z = 0;
};
