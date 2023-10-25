import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, FilePicker, Tab, CustomButton, LogoOffset } from '../components';

const Customizer = ({ moveDecal, setMoveDecal }) => {

  const snap = useSnapshot(state);

  // State for tracking changes of file
  const [file, setFile] = useState('');
  // State for the AI Prompt
  const [prompt, setPrompt] = useState('');
  // Loading state. Are we generating an image?
  const [generatingImg, setGeneratingImg] = useState(false);

  // Active States (activeEditorTab: the side tabs, activeFilterTab: the bottom tabs).
  const [activeEditorTab, setActiveEditorTab ] = useState("");
  const [activeFilterTab, setActiveFilterTab ] = useState({ logoShirt: true, stylishShirt: false });

  // Offset Window
  const [offsetWindow, setOffsetWindow] = useState(true)

  console.log(file)
  // -- Show Tab content depending on the active Tab.
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker 
          file={file}
          setFile={setFile}
          readFile = {readFile}
        />
      case 'aipicker':
        return <AIPicker 
          prompt = {prompt}
          setPrompt = {setPrompt}
          generatingImg = { generatingImg }
          handleSubmit = { handleSubmit }
        />
      default:
        return null;
    }
  }

  // -- When text prompt for AI has been submitted.
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please Enter a Prompt");
    
    try {
      // Call backend here to generate ai image
      setGeneratingImg(true);
      console.log(JSON.stringify({prompt}), prompt)
      // Get the image from backend.
      // Should be a post request because we are passing the prompt.
      const AIresponse = fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            prompt
          })
      })

      if(!AIresponse.ok){
        throw new Error('Billing Hard Limit has been reached.')
      }
      // Get the response containing the base64 image.
      const data = await AIresponse.json();

      // handleDecals(type, `data:image/png;base64,${data.photo}`)

    } catch (error) {
      alert(error)
      
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab("")
    }
  }

  // -- Function to toggle which filter tabs are active. If logo, full texture, or both.
  const handleActiveFilterTab = (tabName) => {
    // Changing the boolean if filter is active.
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // After changing, re-render the UI.
    setActiveFilterTab( (prevState) => {
      return { 
        // Return an OBJECT, spreading 'prevState' then updating the value of
        // 'prevState' with the key of '[tabName]'.
        // NOTE: can only spread within '{}' bc the key (ex: 'name:') is not enclosed with '"'.
        ...prevState, 
        [tabName] : !prevState[tabName]  
      }
    } )
  }

  // -- Figure out if the image uploaded is for the 'logo', or 'full' (Full Texture).
  // Set the image to the 'state' context. (in 'logoDecal' or 'fullDecal' based on the type).
  // Then call 'handleActiveFilterTab()' if the filter tab for that type isn't active and toggle it.
  // ( For image upload ) 
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  // -- Function to get the image ('result') and the type ('logo' or 'full') invoked in FilePicker.jsx.
  // Once one of the 2 buttons there is clicked, the 'reader()' takes the 'file' state, updated in
  // the 'FilePicker.jsx', and executes a promise that when completed, calls 'handleDecals()' with
  // the image. ( For image Upload )
  const readFile = (type) => {
    if(file !== ''){
      reader(file).then( (result) => {
        handleDecals( type, result);
        setActiveEditorTab("");
        console.log(result)
      })
    } else {
      console.log("HUH")
    }
  }

  return (
    <AnimatePresence>
      { !snap.intro && (
        <>
          {/* Side Tab */}
          <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation("left")} >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>

                { EditorTabs.map( (tab) => (
                  <Tab
                    key = {tab.name}
                    tab = {tab}
                    handleClick = { () => { activeEditorTab == tab.name ? setActiveEditorTab("") : setActiveEditorTab(tab.name) } }
                  />
                )) }

                { generateTabContent() }

              </div>
            </div>
          </motion.div>
          {/* Back Button */}
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton 
              type='filled'
              title='Go Back'
              handleClick={ () => state.intro = true }
              customStyles="w-fit px-5 py-2 font-bold text-sm"
            />
          </motion.div>
          
          {/* Logo Offset Window */}
          {activeFilterTab.logoShirt && (
            <>
              <motion.div className='absolute top-0 bottom-0 right-3' {...slideAnimation("right")}>
                <div className='min-h-screen relative'>

                    <LogoOffset
                      headTitle = "Logo Offset"
                      offsetWindowVal = {offsetWindow}
                      handleClick = { () => {setOffsetWindow(!offsetWindow);} }
                      moveDecal={moveDecal}
                      setMoveDecal={setMoveDecal}
                    />

                </div>  
              </motion.div>
            </>
          )}


          {/* Bottom Tab */}
          <motion.div className='filtertabs-container' {...slideAnimation("up")}>
            { FilterTabs.map( (tab) => (
                <Tab
                  key = {tab.name}
                  tab = {tab}
                  isFilterTab
                  isActiveTab={ activeFilterTab[tab.name] }
                  handleClick = { () => { handleActiveFilterTab(tab.name); tab.name == 'logoShirt' ? setOffsetWindow(true) : ''} }
                />
              )) }
          </motion.div>
        </>
      ) }
    </AnimatePresence>
  )
}

export default Customizer