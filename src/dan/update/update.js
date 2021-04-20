import TWEEN from '@tweenjs/tween.js';

/** Recursively calls itself */
export function update(args) {
  const { renderer, scene, camera, controls, fns } = args;
  if (!fns || !renderer || !scene || !controls || !camera) {
    throw new Error("Mandatory params must be provided");
  }

  renderer.render(scene, camera);
  controls.update();
  TWEEN.update();

  fns?.forEach((fn) => fn(args));

  requestAnimationFrame(() => update(args));
}

export const updatePhase = (args) => {
  const { renderer, scene, camera, controls, fns, speed = 60 } = args;
  if (!fns || !renderer || !scene || !controls || !camera) {
    throw new Error("Mandatory params must be provided");
  }

  return setInterval(() => {
    requestAnimationFrame(() => {
      renderer.render(scene, camera);
      controls.update();
      controls.update();

      fns?.forEach((fn) => fn(args));
    });
  }, speed);
};
