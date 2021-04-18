let direction = -1;

export const cameraZPositionMove = ({scene}) => {
  const cameraZPosition = scene.getObjectByName("cameraZPosition");
  cameraZPosition.position.z += 0.25 * direction;
  
  if (direction === -1 && cameraZPosition.position.z < 10) {
    direction = 1;
  }

  if (direction === 1 && cameraZPosition.position.z > 90) {
    direction = -1;
  }
};
