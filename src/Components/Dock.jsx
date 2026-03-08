
import React, { useState, useRef } from 'react'
import "./dock.scss"

const BASE_SIZE = 52
const MAX_SIZE  = 82
const RADIUS    = 130

// ── Inline SVG icons (fill="white", guaranteed rendering) ──────────────────
const Icons = {
    github: (
        <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
        </svg>
    ),
    note: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 4H7v2h10V7zm0 4H7v2h10v-2zm-5 4H7v2h5v-2z"/>
        </svg>
    ),
    pdf: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8.5 19H7v-5h1.5c.83 0 1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5zm3.5 0h-1.5v-5H12c.83 0 1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5zm5-3.5h-1v1h1v1.5H15V14h2.5v1.5z"/>
            <path fill="rgba(255,255,255,0.5)" d="M8.5 15.5H8V18h.5c.28 0 .5-.22.5-.5v-1.5c0-.28-.22-.5-.5-.5zM12 15.5h-.5V18H12c.28 0 .5-.22.5-.5v-1.5c0-.28-.22-.5-.5-.5z"/>
        </svg>
    ),
    calender: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2z"/>
        </svg>
    ),
    spotify: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.966-.519.781.781 0 0 1 .519-.966c3.632-1.102 8.147-.568 11.228 1.327a.78.78 0 0 1 .256 1.067zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 1 1-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 0 1-.955 1.609z"/>
        </svg>
    ),
    mail: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
    ),
    link: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H6.5v-7H9v7zm-1.25-8.27a1.375 1.375 0 1 1 0-2.75 1.375 1.375 0 0 1 0 2.75zM18 17h-2.5v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V17H10v-7h2.5v1.1A3.48 3.48 0 0 1 15 9.5c1.93 0 3 1.57 3 3.5V17z"/>
        </svg>
    ),
    cli: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H4V8h16v11zM6 12.4l1.4-1.4L6 9.6 7.4 8.2l2.8 2.8-2.8 2.8L6 12.4zm5.5 1.6h5v-2h-5v2z"/>
        </svg>
    ),
}

const ITEMS = [
    { id: 'github',  cls: 'github',   icon: Icons.github,   label: 'Projects', action: (set) => set(s => ({ ...s, github: true })) },
    { id: 'note',    cls: 'note',     icon: Icons.note,     label: 'About Me', action: (set) => set(s => ({ ...s, note: true })) },
    { id: 'resume',  cls: 'pdf',      icon: Icons.pdf,      label: 'Resume',   action: (set) => set(s => ({ ...s, resume: true })) },
    { id: 'cal',     cls: 'calender', icon: Icons.calender, label: 'Calendar', action: () => window.open('https://calendar.google.com/', '_blank') },
    { id: 'spotify', cls: 'spotify',  icon: Icons.spotify,  label: 'Spotify',  action: (set) => set(s => ({ ...s, spotify: true })) },
    { id: 'mail',    cls: 'mail',     icon: Icons.mail,     label: 'Mail',     action: () => window.open('mailto:devmayank1005@gmail.com', '_blank') },
    { id: 'link',    cls: 'link',     icon: Icons.link,     label: 'LinkedIn', action: () => window.open('https://www.linkedin.com/in/mayank-kumar-20a385334/', '_blank') },
    { id: 'cli',     cls: 'cli',      icon: Icons.cli,      label: 'Terminal', action: (set) => set(s => ({ ...s, cli: true })) },
]

const Dock = ({ windowsState, setWindowsState }) => {
    const [mouseX, setMouseX] = useState(null)
    const iconRefs = useRef([])

    const getSize = (i) => {
        if (mouseX === null || !iconRefs.current[i]) return BASE_SIZE
        const rect = iconRefs.current[i].getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const dist = Math.abs(mouseX - center)
        if (dist >= RADIUS) return BASE_SIZE
        const t = 1 - dist / RADIUS
        return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * t
    }

    return (
        <footer
            className="dock"
            onMouseMove={e => setMouseX(e.clientX)}
            onMouseLeave={() => setMouseX(null)}
        >
            {ITEMS.map((item, i) => {
                const size = getSize(i)
                const lift = ((size - BASE_SIZE) / (MAX_SIZE - BASE_SIZE)) * 18
                const isOpen = ['github','note','resume','spotify','cli'].includes(item.id)
                    ? !!windowsState[item.id]
                    : false

                return (
                    <div
                        key={item.id}
                        ref={el => iconRefs.current[i] = el}
                        className={`icon ${item.cls}`}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: `translateY(-${lift}px)`,
                        }}
                        onClick={() => item.action(setWindowsState)}
                    >
                        {item.icon}
                        <span className="tooltip">{item.label}</span>
                        {isOpen && <span className="dot" />}
                    </div>
                )
            })}
        </footer>
    )
}

export default Dock
