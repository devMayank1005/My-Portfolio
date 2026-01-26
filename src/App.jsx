import { useState } from 'react'
import "./app.scss"
import Dock from './Components/dock'
import Nav from './Components/Nav'


function App() {
  return (
    <main>
      <Dock />
      <Nav />
    </main>
  )
}

export default App