import { useState } from 'react'
import "./app.scss"
import Dock from './Components/Dock'
import Nav from './Components/Nav'
import MacWindow from './Components/windows/MacWindow'
import Github from './Components/windows/Github'
import Note from './Components/windows/Note'
import Resume from './Components/windows/Resume'


function App() {
  return (
    <main>  
      <Dock />
      <Nav />

      <MacWindow>
        <h1>Hello, Welcome to my Portfolio!</h1>
      </MacWindow>

      <Github />
      <Note />
      <Resume />
    </main>
  )
}

export default App