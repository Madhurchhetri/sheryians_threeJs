import './style.css'
import  * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Value } from 'three/examples/jsm/inspector/ui/Values.js';


//size
const size = {
  width : window.innerWidth,
  height : window.innerHeight
}
//scene

const scene = new THREE.Scene()
const clock = new THREE.Clock()

//camera

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100
)

camera.position.z = 5

//mesh 

const geometry = new THREE.PlaneGeometry(1,1,32,32)
const material = new THREE.ShaderMaterial({
  vertexShader : `

  uniform float uTime;
  void main(){
    vec3 pos = position;
    pos.z += sin(pos.x * 5.0 + 1.57 + uTime);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
  }
  `,
  fragmentShader: `
    void main(){
        gl_FragColor = vec4(0.0,1.0,0.0,1.0);
    }
  ` ,

  uniforms:{
    uTime : {value :0},
  },
  // wireframe : true,
  side: THREE.DoubleSide,
})

const cube = new THREE.Mesh(geometry,material)

scene.add(cube)

//render

const canvas = document.querySelector("canvas")

const renderer = new THREE.WebGLRenderer({
  canvas
})

window.addEventListener("resize",(()=>{
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width/size.height;

  camera.updateProjectionMatrix();

  renderer.setSize(size.width , size.height)

}))

renderer.setSize(window.innerWidth , window.innerHeight)

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true

const animate = ()=>{
  const delta = clock.getElapsedTime()
  // cube.rotation.y = delta

  cube.material.uniforms.uTime.value = delta;
  controls.update()
  renderer.render(scene ,camera)
  requestAnimationFrame(animate)
}
animate()