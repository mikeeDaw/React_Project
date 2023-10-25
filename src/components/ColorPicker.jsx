import React from 'react';
import { SketchPicker, BlockPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from '../store';

const ColorPicker = () => {

  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      {
        // Parameters:
        // disableAlpha - removes the slider for opacity.
        // onChange - function to exec everytime color is changed.
        // presetColors - the small boxes of colors on the sketch picker.
      }
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={ (colorPK) => state.color = colorPK.hex }
        // presetColors={ [ '#EFBD4E', '#ccc', '#2CCCE4', '#80C670', '#ff8a65', '#512314' ] }
      />
    </div>
  )
}

export default ColorPicker