import { useState } from 'react'
import './app.scss'

import Dock from './Component/Dock'
import Nav from './Component/Nav'

import Github from './Component/windows/Github'
import Note from './Component/windows/Note'
import Resume from './Component/windows/Resume'
import Spotify from './Component/windows/Spotify'
import Cli from './Component/windows/Cli'

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
