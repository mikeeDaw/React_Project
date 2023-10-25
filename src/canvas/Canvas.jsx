import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

/*
  Canvas - Is the place where you put your 3D scene
  Environment - environment of the scene, accepts some presets
  Camera - 

  NOTE: some components (CameraRig, Backdrop, Shirt) errors if they do not 
        return a ThreeJS properties/components.

  - For <Canvas> -   
  'fov' - brings the camera closer. lower# : closer, higher# : farther.
  'gl' - to preserve the buffers.
  
*/

const CanvasSpc = ( { moveDecal } ) => {

  return (
    <Canvas
      camera={ {position: [0, 0, 0], fov: 27} }
      shadows
      gl={{ preserveDrawingBuffer: true }} 
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
    
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt moveDecal = {moveDecal} />
        </Center>
      </CameraRig>
      
    </Canvas>
  )
}

export default CanvasSpc