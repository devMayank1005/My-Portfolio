import React from 'react'
import MacWindow from './MacWindow'
import Terminal from 'react-console-emulator'
import "./cli.scss"

const Cli = ({ windowName, windowTitle, setWindowsState }) => {
    const commands = {
        about: {
            description: 'About me',
            usage: 'about',
            fn: () => 'Hi! I am Mayank Kumar — a full-stack web developer passionate about building modern, performant web applications with React, Node.js, and cloud technologies.'
        },
        skills: {
            description: 'List technical skills',
            usage: 'skills',
            fn: () => `Frontend : React, Next.js, Vue.js, HTML/CSS, Sass, Tailwind CSS
Backend  : Node.js, Express, Python, Django
Databases: MongoDB, PostgreSQL, MySQL
Tools    : Git, Docker, Webpack, Vite
Cloud    : AWS, Azure, Heroku`
        },
        projects: {
            description: 'View my projects',
            usage: 'projects',
            fn: () => `1. Portfolio Website     — React + Vite (macOS desktop sim)
2. E-Commerce Platform   — MERN Stack
3. Task Management App   — Next.js + Firebase
4. Real-Time Chat App    — React + Socket.io
5. Data Dashboard        — React + Chart.js

Type 'open github' in dock to see all repos.`
        },
        contact: {
            description: 'Get contact information',
            usage: 'contact',
            fn: () => `Email    : devmayank1005@gmail.com
LinkedIn : linkedin.com/in/mayank-kumar-20a385334
Location : India`
        },
        github: {
            description: 'Open GitHub profile',
            usage: 'github',
            fn: () => {
                window.open('https://github.com/devmayank1005', '_blank')
                return 'Opening GitHub profile...'
            }
        },
        resume: {
            description: 'Open resume',
            usage: 'resume',
            fn: () => {
                window.open('/resume.pdf', '_blank')
                return 'Opening resume...'
            }
        },
        social: {
            description: 'View social media links',
            usage: 'social',
            fn: () => `Twitter  : https://x.com/maaayaankk
LinkedIn : https://linkedin.com/in/mayank-kumar-20a385334
Email    : devmayank1005@gmail.com`
        },
        echo: {
            description: 'Echo a passed string',
            usage: 'echo <string>',
            fn: (...args) => args.join(' ')
        },
        clear: {
            description: 'Clear the terminal',
            usage: 'clear',
            fn: () => ''
        }
    }

    const welcomeMessage = `
╔═══════════════════════════════════════════╗
║     mayank@portfolio ~ %                  ║
╚═══════════════════════════════════════════╝

Welcome! Type 'help' for all commands, or try:
  about     — who am I
  skills    — tech stack
  projects  — things I've built
  contact   — get in touch
  social    — find me online
`

    return (
        <MacWindow windowName={windowName} windowTitle={windowTitle} setWindowsState={setWindowsState}>
            <div className="cli-window">
                <Terminal
                    commands={commands}
                    welcomeMessage={welcomeMessage}
                    promptLabel={'mayank@portfolio:~$'}
                    promptLabelStyle={{ color: '#00ff00' }}
                />
            </div>
        </MacWindow>
    )
}

export default Cli