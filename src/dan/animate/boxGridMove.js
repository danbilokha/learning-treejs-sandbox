import { Noise } from "noisejs";

const noise = new Noise(Math.random());

export const boxGridMove = ({scene, clock}) => {
    const timeElapsed = clock.getElapsedTime();
    const boxGrid = scene.getObjectByName("boxGrid");

    boxGrid.children.forEach((child, idx) => {
      const x = timeElapsed + idx;
      child.scale.y = noise.simplex2(x, x) + 1 + 0.01;
      child.position.y = child.scale.y / 2;
    });
}