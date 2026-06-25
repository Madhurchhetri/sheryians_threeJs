import { Environment, Instance, Instances, useGLTF, useTexture } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import * as THREE from "three"

const Experience = () => {
    const cubeRef = useRef(null);
    const [color , setColor] = useState("red")


    useFrame((state,delta)=>{
       cubeRef.current.rotation.y += delta
    })

    const drieTexture = useTexture(
      {
        matcap : "./matcap.png",
        texture : "https://images.unsplash.com/photo-1780833555435-6bc8595e3f2b?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        texture2 : "https://images.unsplash.com/photo-1780833555435-6bc8595e3f2b?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        textture3 : "https://images.unsplash.com/photo-1780833555435-6bc8595e3f2b?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    )

    // const model = useGLTF('./model.glb')

  // const texture =  useLoader(THREE.TextureLoader,"https://images.unsplash.com/photo-1780833555435-6bc8595e3f2b?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

  const handleClick =()=>{
   setColor(prev => prev === "red" ? "green" : "red") ;
  }

  return (
    <>
        {/* <mesh ref={cubeRef} onClick={handleClick}> */}
            {/* <boxGeometry args={[3,3,3]}/> */}
            {/* <meshBasicMaterial map={drieTexture.texture2} /> */}
            {/* <meshStandardMaterial roughness={0.01} metalness={0.9} color={color}/> */}
        {/* </mesh> */}

        {/* <Environment files='./envMap.hdr'/> */}

        {/* <ambientLight intensity={3} color={'#fff'}/> */}
{/*         
        <primitive position={[0,-2,0]} object={model.scene} /> */}


        {/* *****************instances********************************* */}

        <Instances ref={cubeRef}>
          <boxGeometry/>
          <meshMatcapMaterial matcap={drieTexture.matcap} />
          {/* <Instance/> */}
          {Array.from({length: 200}).map((_,id)=>{
            return <Instance key={id} position={[
              Math.random() * 50 - 25 ,
               Math.random() * 10 -5 ,
                Math.random() * 50 - 25
                ]}

                scale={Math.random() + 0.25}

                />
          })}
        </Instances>
        

    </>
  )
}

export default Experience