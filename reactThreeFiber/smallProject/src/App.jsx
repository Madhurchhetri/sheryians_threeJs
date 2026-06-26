import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from './components/Experience'
import { OrbitControls } from '@react-three/drei'

const App = () => {
  return (
    <div className='parent'>
      <Canvas>
      
        <Experience/>
      </Canvas>
    </div>
  )
}

export default App