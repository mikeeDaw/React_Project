import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, PivotControls } from '@react-three/drei';

import state from '../store';

/*
    <group /> - JSX for 'THREE.Group()'. Combine 3D objects so they move together
    <mesh /> - JSX for 'THREE.Mesh()'. Creates the 3D object. To create a mesh, you need
               a 'geometry' and 'material'.

*/

const Shirt = ({ moveDecal }) => {

  const group = useRef();

  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  // The '.glb' file is from a model made from blender.

  const logoTexture = useTexture(snap.logoDecal);
  const fullTextre = useTexture(snap.fullDecal);

  const [coord, setCoord] = useState([0, 0.04 ,0.1])
  const [rot, setRotation] = useState([0,0,0])

  // For position and rotation of Decal (Used in OnDrag)
  var position = new THREE.Vector3()
  const scale = new THREE.Vector3()
  const quaternion = new THREE.Quaternion()

  // To color the T-shirt
  useFrame( (state, delta) => {
    // '.dampC' takes colors
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)

    // Rotation of T-shirt based on mouse Cursor
    // *This one rotates the MODEL not the camera like on 'CameraRig.jsx'.
    easing.dampE(
          group.current.rotation,
          [state.pointer.y / 10, state.pointer.x / 5, 0],
          0.25,
          delta
      )

  })

  const stateString = JSON.stringify(state)

  return (
    <group key={stateString} ref={group}> 
      { 
        // Sometimes won't update color to fix it, provide a 'key' to the <group />.
        // the 'stateString' tracks the state changes. React will re-render the tshirt 
        // on changes.
      }
        <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1}
        material-roughness= {1} dispose={null} >

          { moveDecal && (
            <group position={[0, 0.04 ,0.1]} >
            <PivotControls 
                scale={0.2}
                activeAxes={[true,true,false]}
                depthTest = {false}
                rotation={rot}
                onDrag={ (local) => {
                  

                  local.decompose(position, quaternion, scale)
                  const rotation = new THREE.Euler().setFromQuaternion(quaternion)
                  setCoord([position.x, position.y, 0.09])
                  setRotation([rotation.x, rotation.y, rotation.z])

                }}
              />
          </group>
          )}


            
            {snap.isFullTexture && ( 
              // For the binding to texture to the whole shirt. Toggled in the 'Tab' component
              <Decal
                polygonOffset
                position={[0,0,0]}
                rotation={[0, 0.04 ,0.1]}
                scale={1}
                map={fullTextre}
              />
            )}

            {snap.isLogoTexture && ( 
              // For binding the logo to the shirt. Toggled in the 'Tab' component
              // depthTest - Ensure to render on top of other objects on the scene.
              <Decal
                position={coord}
                rotation={rot}
                scale={0.15}
                map={logoTexture}
                depthTest = {false}
                depthWrite={true}
              />
            )}
          

        </mesh>

        
    </group>

    
  )
}

export default Shirt