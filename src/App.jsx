import Canvas from "./canvas/Canvas";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import React, { useState, useEffect } from 'react'

function App() {

  // Decal Position
  const [moveDecal, setMoveDecal] = useState(false)

  return (
      <main className="app transition-all ease-in">
        <Home />
        <Canvas moveDecal = {moveDecal} />
        <Customizer moveDecal= {moveDecal} setMoveDecal = {setMoveDecal} />
      </main>
  )
}

export default App
