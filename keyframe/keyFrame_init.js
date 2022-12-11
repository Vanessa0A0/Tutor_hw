import * as THREE from "https://threejs.org/build/three.module.js"; 
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {bulidCar} from "./bulidCar-ES6.js";

var camera, scene, renderer;
var keys;
var T = 6;
var clock = new THREE.Clock();
var ts = clock.getElapsedTime();
var car;

//var car;
function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(300, 400, 500); // camera at (0,0,500)
  let controls = new OrbitControls(camera, renderer.domElement);

  ////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(300, 30, 'red', 'white');
  scene.add(gridXZ);
  car = bulidCar();
  scene.add(car);
  ///////////////////
  var pos1 = new THREE.Vector3(0, 0, -50);
  var pos2 = new THREE.Vector3(-40, 0, 50);
  var pos3 = new THREE.Vector3(50, 0, 0);
  var pos4 = new THREE.Vector3(-50, 0, 0);
  var pos5 = new THREE.Vector3(40, 0, 50);
  
  var quad1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0,-Math.PI*3/5,0));//p(i+1)-p(i-1)
  var quad2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI/5 ,0 ));
  var quad3 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0 ));
  var quad4 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI/5 ,0 ));
  var quad5 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI*3/5, 0 ));
  
  keys = [
    [0, pos1, quad1],   // quad1 ...
    [0.2, pos2, quad2],
    [0.4, pos3, quad3],
    [0.6, pos4, quad4],
    [0.8, pos5, quad5],
    [1, pos1, quad1]
  ];

}

function clamp(v, lo, hi) {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

function keyframe(t) {
  var s = ((t - ts) % T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  
  car.position.lerpVectors(keys[ii][1], keys[ii+1][1], a);
  car.quaternion.slerpQuaternions (keys[ii][2], keys[ii+1][2], a);  
}

function animate() {

  keyframe (clock.getElapsedTime());
  
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export {init, animate};
export {camera, scene, renderer};