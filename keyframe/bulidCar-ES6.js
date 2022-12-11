import * as THREE from "https://threejs.org/build/three.module.js";

export function bulidCar(){
  var car = new THREE.Group();
  let normalMat = new THREE.MeshNormalMaterial({
    wireframe: true
  });
  let body = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 4, 20), normalMat);
  let nose = new THREE.Mesh(new THREE.BoxGeometry(25, 4, 7), normalMat);
  nose.position.x = 25 / 2;
  car.add(body, nose);
  //scene.add (car);
  return car;
}