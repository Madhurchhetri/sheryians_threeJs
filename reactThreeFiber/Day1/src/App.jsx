import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { OrbitControls } from '@react-three/drei'


const App = () => {
  return (
    <>
    <div className="parent h-screen w-full">
        <Canvas>
            <OrbitControls/>
            <Experience/>
        </Canvas>
    </div>
        
    </>
  )
}

export default App