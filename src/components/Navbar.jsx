import { useEffect, useState } from 'react'
import { GiftIcon } from './icons'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Occasions', href: '#occasions', id: 'occasions' },
  { label: 'Gift Ideas', href: '#ideas', id: 'ideas' },
  { label: 'How It Works', href: '#how', id: 'how' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['home', 'occasions', 'ideas', 'how', 'about', 'find', 'contact']
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return

        const id = visible[0].target.id
        setActiveId(id === 'find' ? 'contact' : id)
      },
      {
        root: null,
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <a href="#home" className="brand" aria-label="GiftFinder home">
        <span className="brand-icon" aria-hidden="true">
          <GiftIcon size={20} />
        </span>
        <span className="brand-text">GiftFinder</span>
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links${open ? ' is-open' : ''}`} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={activeId === link.id ? 'is-active' : undefined}
            aria-current={activeId === link.id ? 'page' : undefined}
            onClick={() => {
              setActiveId(link.id)
              setOpen(false)
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#find" className="nav-cta" onClick={() => setOpen(false)}>
        <GiftIcon size={16} />
        <span>Find a Gift</span>
      </a>
    </header>
  )
}
