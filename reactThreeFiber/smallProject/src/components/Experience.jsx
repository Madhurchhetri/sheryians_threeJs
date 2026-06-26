import { useControls } from 'leva'
import React from 'react'
import FanGroup from './FanGroup';
import { OrbitControls } from '@react-three/drei';

const Experience = () => {
   const {X ,Y} = useControls("box position",{
        X:{value:0, min:-4, max:4, step: 0.01 ,label : "x-position"},
        Y:{value:0, min:-4, max:4, step: 0.01 , label : "y-position"}
    });
  return (
    <>
        {/* <mesh position={[X,Y,0]} >
            <boxGeometry/>
            <meshBasicMaterial color={"red"}/>
        </mesh> */}

          <ambientLight intensity={2} color={"#fff"}/>
        <FanGroup/>
        <OrbitControls/>
    </>
  )
}

export default Experience ;