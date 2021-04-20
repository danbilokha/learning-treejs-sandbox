import { Noise } from 'noisejs';

export function update(renderer, scene, camera, controls, clock) {
    renderer.render(scene, camera);
    const noise = new Noise(Math.random());
    const timeElapsed = clock.getElapsedTime();

    const cameraZPosition = scene.getObjectByName('cameraZPosition');
    const cameraZRotation = scene.getObjectByName('cameraZRotation');
    const cameraXRotation = scene.getObjectByName('cameraXRotation');


    const boxGrid = scene.getObjectByName('boxgrid');

    boxGrid.children.forEach(function (box, index) {
        const x = timeElapsed + index;
        box.scale.y = (noise.simplex2(x, x) + 1) + 0.001;
        box.position.y = box.scale.y / 2;
    });
  
    /** Update camera moving around */
    // controls.update();

    Tween.update();
  
    requestAnimationFrame(() => update(renderer, scene, camera, controls, clock));
  }

  export function slowUpdate(renderer, scene, camera, controls, clock) {
      renderer.render(scene, camera);
      /** Update camera moving around */
      controls.update();

      setInterval(() => {
          requestAnimationFrame(() => {
              const cameraZRotation = scene.getObjectByName('cameraZRotation');
              cameraZRotation.rotation.z = (cameraZRotation.rotation.z < 0 ?  Math.PI  : -Math.PI) * 0.01;
              console.log('cameraZRotation', cameraZRotation.rotation.z);
          });
      }, 120);
  }