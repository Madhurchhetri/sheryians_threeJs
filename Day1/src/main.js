import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// scene

const scene = new THREE.Scene();

// camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  100,
)

camera.position.z = 5; 

// mesh

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
  color : "red",
})

const cube = new THREE.Mesh(geometry,material)
 

scene.add(cube);

// canvas

const canvas = document.querySelector("canvas");

// renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
});

const controls = new OrbitControls( camera, renderer.domElement );

controls.enableDamping = true;

renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.render(scene,camera)

const animate = () =>{
  
  // cube.rotation.y += 0.01;

  controls.update();

  renderer.render(scene,camera);

  requestAnimationFrame(animate);
}
animate()