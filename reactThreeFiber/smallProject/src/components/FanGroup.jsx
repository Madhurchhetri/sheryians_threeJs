import { useControls } from 'leva'
import React, { useMemo, useRef } from 'react'
import { images } from '../Data/Images'
import ImagePlane from './ImagePlane'
import { useFrame } from '@react-three/fiber'


const FanGroup = () => {
  const{numPlanes , spreadAngle , planeHeight , planeWidth , positionY}=  useControls("box fan",{
        numPlanes:{
            value: 6,
            min: 2,
            max : 40,
            step : 1,
            label: "No. of planes"
        },
        spreadAngle : {
            value : 360,
            min : 20,
            max : 360,
            step : 1,
            label : " Spread angle "
        },
        planeWidth : {
            value : 2.5,
            min : 0.4,
            max : 6,
            step : 0.5,
            label : " plane width "
        },
        planeHeight : {
            value : 2.5,
            min : 0.4,
            max : 8,
            step : 0.5,
            label : " plane height "
        },
        positionY : {
            value : -1.5,
            min : -6,
            max : 6,
            step : 0.5,
            label : " Y position "
        }
    })

    const planes = useMemo(()=>{
        const count = numPlanes;
        const totalArcRad = (spreadAngle * Math.PI ) /180;
        const step = totalArcRad / (count-1);
        const startingAngle = - totalArcRad / 2

        return Array.from({length: count},(_,i)=>{
            const angle = startingAngle + i * step;
            return {
                key : i,
                url: images[i % images.length],
                position : [0,0,0],
                rotation : [0, angle , 0]
            }
        })
    },[numPlanes, spreadAngle])

    const groupRef = useRef(null);

    useFrame((state,delta)=>{
        groupRef.current.rotation.y += delta;   
    })
  return (
    <group position={[0,positionY,0]} ref={groupRef}>
        {planes.map((plane)=>(<ImagePlane key={plane.key} url={plane.url} position={plane.position} rotation={plane.rotation}
            planeWidth={planeWidth}
            planeHeight={planeHeight}
        />))}
    </group>
  )
}

export default FanGroup