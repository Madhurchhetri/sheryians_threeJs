import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js';


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
//     console.log("texture is loaded")
// },
// ()=>{
//   console.log("texture is loading")
// },
// ()=>{
//   console.log("some error is there")
// })


// RgbeLoader



const envMap = new RGBELoader();
envMap.load('./envMap.hdr',
  (envMap)=>{
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = envMap;
    scene.environment = envMap;
})




// gltf loader


const gltfLoader = new GLTFLoader();

let mixer;

gltfLoader.load("./robot.glb" ,(gltf)=>{
    const model = gltf.scene;

    model.position.y = -3

    // console.log(gltf.animations)

    mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0])
    action.play();

    // scene.add(model)
})

//camera

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100
)

camera.position.z = 5

// mesh

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshStandardMaterial({
  color : "red",
  // map: texture,
  metalness : 0.8,
  roughness : 0.1,
})

//lighitng

const ambientLight = new THREE.AmbientLight("#fff" , .5)
scene.add(ambientLight)

// const directionLight = new THREE.DirectionalLight("#fff", 8)
// directionLight.position.set(1,1,2)
// scene.add(directionLight)

// const directionLightHelper = new THREE.DirectionalLightHelper(directionLight)
// scene.add(directionLightHelper)

const cube = new THREE.Mesh(geometry,material)

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

window.addEventListener("mousemove" , (e)=>{
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = ((e.clientY / window.innerHeight) * 2 - 1);
})


scene.add(cube)

window.addEventListener("click",()=>{
  raycaster.setFromCamera(mouse,camera);

  const intersect = raycaster.intersectObject(cube);

  if(intersect.length > 0 ){
    cube.material.color.set("green")
  }

})

//canvas

const canvas = document.querySelector("canvas")

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas
});

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true

window.addEventListener("resize",()=>{
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width/size.height;

  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height)
})

renderer.setSize(window.innerWidth , window.innerHeight)

const animate = ()=>{
  const delta = clock.getElapsedTime()
  // cube.rotation.y = delta;

  // if(mixer){
  //   mixer.update(delta * 0.01)
  // }

  controls.update();

  renderer.render(scene,camera)

  requestAnimationFrame(animate)
}

animate()


