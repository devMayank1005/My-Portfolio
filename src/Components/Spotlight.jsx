import React, { useState, useEffect, useRef } from 'react'
import './spotlight.scss'

const RESULTS = [
    // Windows
    { id: 'github',  label: 'Projects',  icon: '🗂️',  type: 'window',   hint: 'Open Projects window' },
    { id: 'note',    label: 'About Me',  icon: '📝',  type: 'window',   hint: 'Open About Me note' },
    { id: 'resume',  label: 'Resume',    icon: '📄',  type: 'window',   hint: 'View my resume (PDF)' },
    { id: 'spotify', label: 'Spotify',   icon: '🎵',  type: 'window',   hint: 'Open Spotify player' },
    { id: 'cli',     label: 'Terminal',  icon: '💻',  type: 'window',   hint: 'Open interactive terminal' },
    // Links
    { id: 'gh',      label: 'GitHub',    icon: '🐙',  type: 'link',     hint: 'https://github.com/devmayank1005', url: 'https://github.com/devmayank1005' },
    { id: 'li',      label: 'LinkedIn',  icon: '💼',  type: 'link',     hint: 'linkedin.com/in/mayank-kumar-20a385334', url: 'https://linkedin.com/in/mayank-kumar-20a385334' },
    { id: 'tw',      label: 'Twitter',   icon: '🐦',  type: 'link',     hint: 'x.com/maaayaankk', url: 'https://x.com/maaayaankk' },
    { id: 'mail',    label: 'Email Me',  icon: '✉️',  type: 'link',     hint: 'devmayank1005@gmail.com', url: 'mailto:devmayank1005@gmail.com' },
]

const Spotlight = ({ setWindowsState }) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(0)
    const inputRef = useRef(null)

    const filtered = query.trim() === ''
        ? RESULTS
        : RESULTS.filter(r =>
            r.label.toLowerCase().includes(query.toLowerCase()) ||
            r.hint.toLowerCase().includes(query.toLowerCase())
        )

    // Keyboard shortcut: CMD+Space or CMD+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === ' ')) {
                e.preventDefault()
                setOpen(prev => !prev)
                setQuery('')
                setSelected(0)
            }
            if (e.key === 'Escape') {
                setOpen(false)
                setQuery('')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Auto-focus input when opened
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [open])

    // Reset selection when query changes
    useEffect(() => {
        setSelected(0)
    }, [query])

    const handleAction = (item) => {
        if (item.type === 'window') {
            setWindowsState(state => ({ ...state, [item.id]: true }))
        } else if (item.type === 'link') {
            window.open(item.url, '_blank')
        }
        setOpen(false)
        setQuery('')
    }

    const handleKeyNav = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelected(s => Math.min(s + 1, filtered.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelected(s => Math.max(s - 1, 0))
        } else if (e.key === 'Enter' && filtered[selected]) {
            handleAction(filtered[selected])
        }
    }

    if (!open) return null

    return (
        <div className="spotlight-overlay" onClick={() => setOpen(false)}>
            <div className="spotlight-box" onClick={e => e.stopPropagation()}>
                <div className="spotlight-input-row">
                    <span className="spotlight-search-icon">⌘</span>
                    <input
                        ref={inputRef}
                        className="spotlight-input"
                        type="text"
                        placeholder="Search — windows, links, commands..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyNav}
                    />
                </div>
                {filtered.length > 0 && (
                    <ul className="spotlight-results">
                        {filtered.map((item, i) => (
                            <li
                                key={item.id}
                                className={`spotlight-result ${i === selected ? 'active' : ''}`}
                                onClick={() => handleAction(item)}
                                onMouseEnter={() => setSelected(i)}
                            >
                                <span className="result-icon">{item.icon}</span>
                                <div className="result-text">
                                    <span className="result-label">{item.label}</span>
                                    <span className="result-hint">{item.hint}</span>
                                </div>
                                <span className="result-type">{item.type}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {filtered.length === 0 && (
                    <p className="spotlight-empty">No results for "{query}"</p>
                )}
            </div>
        </div>
    )
}

export default Spotlight
