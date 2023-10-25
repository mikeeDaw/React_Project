import React from 'react';

import CustomButton from './CustomButton';

const FilePicker = ( {file, setFile, readFile} ) => {



  return (
    <div className='filepicker-container'>
      <div className='flex flex-1 flex-col'>

        <input 
          id='file-upload' 
          type='file' 
          accept='image/*'
          onChange={(e) => {setFile(e.target.files[0])} }
        />
        {
          // onChange - set the 'file' state on the Customizer.jsx that will be used
          //            to read the uploaded image.
          // 'e.target.files[0]' - the first image that was uploaded.
        }
        <label htmlFor='file-upload' className='filepicker-label'> Upload File </label>
        <p className='mt-2 text-gray-500 text-xs truncate'> 
          {file === '' ? "No file Selected" : file.name}
        </p>

      </div>

      {
        // Wrapper for Buttons
      }
      <div className='mt-4 flex flex-wrap gap-3'>

          <CustomButton 
            type="outline"
            title="Logo"
            handleClick={ () => readFile('logo') }
            customStyles="text-xs"
          />
          <CustomButton 
            type="filled"
            title="Full"
            handleClick={ () => {console.log('clicked full');readFile('full')} }
            customStyles="text-xs"
          />

      </div>
    </div>
  )
}

export default FilePicker