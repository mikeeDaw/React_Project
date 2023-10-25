import React, { useRef } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

// Backdrop is the lights behind the shirt.
const Backdrop = () => {

  const shadows = useRef();

  // - For 'AccumulativeShadows' -
  // 'temporal' - accumulates shadows over time.
  // 'frames' - how many frames it can render, higher# has cleaner results
  //            but takes time.
  // 'rotation' - NOTE: the axis WHERE IT ROTATES corresponds to [x, y, z].
  // * See Documentation for more and other functions/tags.

  return (

    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60} 
      alphaTest={0.85}
      // scale={10}
      rotation={[Math.PI / 2, 0 , 0]}
      position={[0, 0, -0.25]}
    >
      
        <RandomizedLight 
          amount={5}
          radius={15}
          intensity={1.1}
          ambient={0.25}
          position={[8, 15, -12]}
        />

        <RandomizedLight 
          amount={4}
          radius={12}
          intensity={0.6}
          ambient={0.5}
          position={[-4, 15, -3]}
        />

    </AccumulativeShadows>

  )
}

export default Backdrop