import { useState } from 'react'
import './app.scss'
import Dock from './Components/Dock'
import Nav from './Components/Nav'

import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'

const WINDOWS = {
  github: Github,
  note: Note,
  resume: Resume,
  spotify: Spotify,
  cli: Cli
}

function App() {
  const [windowsState, setWindowsState] = useState(
    Object.fromEntries(
      Object.keys(WINDOWS).map(key => [key, false])
    )
  )

  return (
    <main>
      <Nav />
      <Dock
        windowsState={windowsState}
        setWindowsState={setWindowsState}
      />

      {Object.entries(WINDOWS).map(([name, Component]) =>
        windowsState[name] ? (
          <Component
            key={name}
            windowName={name}
            setWindowsState={setWindowsState}
          />
        ) : null
      )}
    </main>
  )
}

export default App
