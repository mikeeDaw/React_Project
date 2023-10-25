import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

// Pass children components, the '<Center>' containing the Shirt.
const CameraRig = ( { children } ) => {

  // Can use the ref to update the state
  const group = useRef();
  const snap = useSnapshot(state);

  // 'useFrame' hook allows to execute code on every rendered frame
  // state - gives state object of the ThreeJS scene.
  // delta - how many milliseconds since the last time 'delta' was set.
  //       - milliseconds between renders. 
  useFrame( (state, delta) => {
    // Make the 3D responsive
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set initial position of Model
    // [x (+# : to left, -# : to right), y (+#: down, -#: up), z (higher#: farther, lower#: closer )]
    let targPosition = [-0.4, 0, 2]; // [-0.85, -0.55, 2]
    if (snap.intro){
        if(isBreakPoint) targPosition = [ -0.4, 0, 2];
        if(isMobile) targPosition =  [ 0, 0.15, 2.5];
    } else {
        if(isMobile) targPosition = [ 0, 0, 2.5];
        else targPosition = [0, 0, 2]; // [-0.5, -0.55, 2]
    }

    // Set model CAMERA POSITION
    // '.damp3' takes vectors, scalars (ex: animate mesh position)
    easing.damp3(state.camera.position, targPosition, 0.25, delta)


    // Set the TSHIRT ROTATION (due to mouse position)
    // '.dampE' takes 'Eulers' (ex: for rotations)
    /* Parameters: current (the object), target (to target/ goal value), 
                   smoothTime (approx time to reach target), delta (refreshrate independence ) */
    // easing.dampE(
    //     group.current.rotation,
    //     [state.pointer.y / 10, state.pointer.x / 5, 0],
    //     0.25,
    //     delta
    // )


   })


  return (
    // with 'ref={group}', React will put this 'group' DOM Element to the 'myRef.current'.
    <group ref={group}>
        { children } 
    </group>
    
  )
}

export default CameraRig