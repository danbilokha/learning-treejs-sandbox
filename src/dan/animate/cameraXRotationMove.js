import { Tween } from "@tweenjs/tween.js";

let direction = 1;

export const cameraXRotationMove = ({ scene }) => {
  const cameraXRotation = scene.getObjectByName("cameraXRotation");
  if (cameraXRotation.rotation.x < 0) {
    direction = 1;
  } else {
    direction = -1;
  }

  cameraXRotation.rotation.x += 0.01 * direction;

  if (cameraXRotation.rotation.x > Math.PI) {
    cameraXRotation.rotation.x = Math.PI;
  }

  if (cameraXRotation.rotation.x < -Math.PI) {
    cameraXRotation.rotation.x = -Math.PI;
  }
};

let directionV2 = 1;

export const cameraXRotationMoveV2 = ({ scene }) => {
  const cameraXRotation = scene.getObjectByName("cameraXRotation");

  const tween1 = new Tween({ val: 100 })
    .to({ val: -100 }, 12000)
    .onUpdate(function () {
      const val = this._object.val;      

      if (cameraXRotation.rotation.x === Math.PI) {
        directionV2 = -1;
      } else if(cameraXRotation.rotation.x === -Math.PI) {
        directionV2 = 1;
      }
      
      cameraXRotation.rotation.x += Math.abs(val * 0.0001) * directionV2;

      if (cameraXRotation.rotation.x > Math.PI) {
        cameraXRotation.rotation.x = Math.PI;
      }

      if (cameraXRotation.rotation.x < -Math.PI) {
        cameraXRotation.rotation.x = -Math.PI;
      }
    })
    .repeat(Infinity)
    .start();
};
