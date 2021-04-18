import {
  getAmbientLight, getDirectionalLight, getSpotLight
} from "./creators/index";
import { getSphere } from "./creators/objects";

export function setupSpotLight({
  lightPositionX,
  lightPositionY,
  lightPositionZ,
  gui,
}) {
  const sphere = getSphere(0.35);
  const light = getSpotLight(0.5);

  light.intensity = 2;
  light.penumbra = 0.25;
  light.position.x = lightPositionX;
  light.position.y = lightPositionY;
  light.position.z = lightPositionZ;

  light.shadow.bias = 0.001;
  light.shadow.mapSize.width = 1024 * 2;
  light.shadow.mapSize.height = 1024 * 2;

  light.add(sphere);

  gui.add(light, "intensity", 0, 10);
  gui.add(light.position, "x", 0, 20);
  gui.add(light.position, "y", 0, 20);
  gui.add(light.position, "z", 0, 20);
  gui.add(light, "penumbra", 0, 1);

  return light;
}

export function setupDirectionalLight({
  lightPositionX,
  lightPositionY,
  lightPositionZ,
  gui,
}) {
  const sphere = getSphere(0.35);
  const light = getDirectionalLight(1);

  light.penumbra = 0.25;
  light.position.x = lightPositionX;
  light.position.y = lightPositionY;
  light.position.z = lightPositionZ;

  light.shadow.bias = 0.001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;

  light.shadow.camera.left = -100;
  light.shadow.camera.right = 100;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.top = 100;

  light.add(sphere);

  gui.add(light, "intensity", 0, 10);
  gui.add(light.position, "x", 0, 20);
  gui.add(light.position, "y", 0, 20);
  gui.add(light.position, "z", 0, 20);

  return light;
}

export function setupAmbientLight({
  lightPositionX,
  lightPositionY,
  lightPositionZ,
}) {
  const light = getAmbientLight(0.25);

  light.position.x = lightPositionX;
  light.position.y = lightPositionY;
  light.position.z = lightPositionZ;

  return light;
}
