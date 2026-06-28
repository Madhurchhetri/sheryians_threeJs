import gsap from 'gsap';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//  size

const size = {
  width : window.innerWidth,
  height : window.innerHeight
}

//scene

const scene = new THREE.Scene()
const clock = new THREE.Clock()

//texture

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("https://images.unsplash.com/photo-1782313809673-c106aeb7b3a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4MHx8fGVufDB8fHx8fA%3D%3D" , 
  ()=>{
    console.log("texture loaded")
  },
  ()=>{
    console.log("texture is loading")
  },
  ()=>{
    console.log("some error in texture")
  }
) 

const texture2 = textureLoader.load("https://images.unsplash.com/photo-1782231723866-854d7407607a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
  ()=>{
    console.log("texture2 loaded")
  },
  ()=>{
    console.log("texture2 is loading")
  },
  ()=>{
    console.log("some error in texture 2")
  }
)



// camera 

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100
)

camera.position.z = 2;

// mesh 

const geometry = new THREE.PlaneGeometry(1,1,32,32)
const material = new THREE.ShaderMaterial({
  vertexShader : `

      uniform float uTime;
      varying vec2 vUv;

      void main(){
        vec3 pos = position;
        // pos.z += sin(pos.x * 5.0 + 1.57 + uTime);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);

        vUv = uv;
      }
  `,
  fragmentShader :`

    varying vec2 vUv;

    uniform sampler2D uTexA;
     uniform sampler2D uTexB;
     uniform float uProgress;

     // Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

      void main(){

      vec2 uv = vUv;

        vec2 dir = normalize(vec2(0.0,1.0));

        float ripple = sin(uProgress * 3.14) * 0.05;

        float gradient = dot(uv - 0.5 , dir) + 0.5;

        float n = snoise(uv * 6.0) * 0.25;

        float localGradient = gradient + n;

        float edge = 0.15;

        float sweep = uProgress * (1.0 + edge * 2.0) - edge;

        // float mixer = smoothstep(gradient - edge, gradient + edge, sweep);

          float mixer = smoothstep(localGradient - edge, localGradient + edge, sweep);
        
        vec2 uvA = uv - dir * ripple;
        vec2 uvB = uv + dir * ripple;

        // uvA.x +=0.2;

        vec4 colorA = texture2D(uTexA , uvA);
        vec4 colorB = texture2D(uTexB , uvB);
        vec4 finalColor = mix(colorA , colorB , mixer);

        // gl_FragColor = vec4(vUv,0.0,1.0);

        gl_FragColor = finalColor;
      }
  `,

  uniforms : {
    uTime : {value : 0},
    uTexA : {value : texture},
    uTexB : {value : texture2},
    uProgress : {value: 0.0}
  },

  // wireframe: true,
  side : THREE.DoubleSide,
})

const cube = new THREE.Mesh(geometry,material)

scene.add(cube)

//raycaster

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener("mousemove" , (e)=>{
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = ((e.clientY / window.innerHeight) * 2 - 1);
})

window.addEventListener("click",()=>{
  raycaster.setFromCamera(mouse , camera);

  const intersect = raycaster.intersectObject(cube);

  if(intersect.length > 0){
    gsap.to(material.uniforms.uProgress,{
      value:1.0,
      duration:1.6,
      ease:"power3.out",
    })
  }
});

// render

const canvas = document.querySelector("canvas")

window.addEventListener("resize" , (()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width / size.height ;

    camera.updateProjectionMatrix()

    renderer.setSize(size.width , size.height)
}))

const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setSize(window.innerWidth , window.innerHeight)

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true

const animate = () =>{
  // cube.rotation.y += 0.01
  const delta = clock.getElapsedTime()

  cube.material.uniforms.uTime.value = delta;
  controls.update()
  renderer.render(scene , camera)
  requestAnimationFrame(animate)
}

animate()