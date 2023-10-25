import React, { useCallback, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { DArrow } from '../assets';
import state from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-solid-svg-icons'
import { darkenColor, getContrastingColor } from '../config/helpers';

const LogoOffset = ({ headTitle, offsetWindowVal, handleClick, moveDecal, setMoveDecal} ) => {

  var snap = useSnapshot(state)

  const toggleMove = useCallback( () => {
    setMoveDecal(!moveDecal)
  } )

  return (
    <>
        <div className={'absolute bottom-32 lg:bottom-72 transition-all '+ (offsetWindowVal ? 'right-0' : 'right-[-190px]')}>
            <div className= 'offset flex justify-center items-center'>

                {/* <div className='flex flex-col justify-evenly' style={{ color: darkenColor(snap.color,30)}} >
                  <div className='flex justify-center'> 
                    <FontAwesomeIcon icon={faCircleUp} className='h-10 cursor-pointer' onClick={ toggleMove } />
                  </div>
                  <div className='flex justify-evenly w-full'>
                    <div> <FontAwesomeIcon icon={faCircleUp} className='h-10 -rotate-90 cursor-pointer' /> </div>
                    <div> <FontAwesomeIcon icon={faCircleUp} className='h-10 rotate-90 cursor-pointer' /> </div>
                  </div>
                  <div className='flex justify-center'> 
                    <FontAwesomeIcon icon={faCircleUp} className='h-10 rotate-180 cursor-pointer' />
                  </div>
                </div> */}

                <div className='flex flex-col justify-center items-center grow gap-y-4'>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" onClick={ toggleMove } />
                    <div class={"w-16 h-8 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-fuchsia-500"} style={{backgroundColor: snap.color}}></div>
                  </label>

                  <div className='flex flex-row justify-evenly w-full'>
                    <span className='' style={{ color: darkenColor(snap.color,30)} }> OFF </span>
                    <span className=' font-bold bg-gradient-to-r from-sky-500 to-fuchsia-500' style={{WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> ON </span>
                  </div>
                </div>

                
                <div 
                  className='offsetHeader'
                  onClick={handleClick}
                  style={{ backgroundColor: snap.color, color: getContrastingColor(snap.color) }}
                >
                    {headTitle}
                </div>
            </div>
        </div>
    </>

  )
}

export default LogoOffset