
export function update(renderer, scene, camera, controls) {
    renderer.render(scene, camera);
  
    /** Update camera moving around */
    controls.update();
  
    requestAnimationFrame(() => update(renderer, scene, camera, controls));
  }