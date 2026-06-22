import './style.css'
import * as THREE from  'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const size = {
  width : window.innerWidth,
  height : window.innerHeight
}

//scene

const scene = new THREE.Scene();
const clock = new THREE.Clock();

//texture

// const textureLoader = new THREE.TextureLoader();

// const texture = textureLoader.load("https://images.unsplash.com/photo-1781694949169-8dad95b59995?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   ()=>{
//     console.log("texture loaded")
//   },
//   ()=>{
//     console.log("texture is loading..........")
//   },
//   ()=>{
//     console.log("some error is there")
//   }

// )

//camera 

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100,
)

camera.position.z = 5;

//lighting

const ambientLighting = new THREE.AmbientLight("#fff", .25 )
scene.add(ambientLighting)

const directionLight = new THREE.DirectionalLight("#fff", 8)
directionLight.position.set(1,1,2)
scene.add(directionLight)

const directionLightHelper = new THREE.DirectionalLightHelper(directionLight)
scene.add(directionLightHelper)

//mesh

const geometry = new THREE.BoxGeometry(1,1,1) 
const material = new THREE.MeshStandardMaterial({
  color : "red",
  // map : texture,
})

const cube = new THREE.Mesh(geometry,material)

// cube.position.x = -1.5;
// cube.position.y = -1.5;
// cube.position.z = -1.5;

// cube.position.set(1.5,2,-1.4)

// cube.scale.set(1,2,1)

// cube.rotation.x = Math.PI / 3


scene.add(cube)

// canvas

const canvas = document.querySelector("canvas");

//rendrer

const renderer = new THREE.WebGLRenderer({
  canvas,
})

const controls = new OrbitControls( camera, renderer.domElement );

controls.enableDamping = true

window.addEventListener("resize",()=>{
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width /size.height
  camera.updateProjectionMatrix();
  renderer.setSize(size.width,size.height)
})

renderer.setSize(size.width , size.height);

// animate

const animate = ()=>{
  const delta = clock.getElapsedTime();

 
  // cube.rotation.y = delta
  controls.update()
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

animate()