import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Results from './components/Results'
import {
  Occasions,
  GiftIdeas,
  HowItWorks,
  About,
  FindGiftForm,
  Contact,
  Footer,
} from './components/Sections'

export default function App() {
  const [results, setResults] = useState(null)

  useEffect(() => {
    if (!results) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [results])

  const handleGiftComplete = (payload) => {
    setResults(payload)
  }

  const handleBackToForm = () => {
    setResults(null)
    requestAnimationFrame(() => {
      document.getElementById('find')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  if (results) {
    return (
      <div className="app">
        <Navbar />
        <main>
          <Results payload={results} onBack={handleBackToForm} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Occasions />
        <GiftIdeas />
        <HowItWorks />
        <About />
        <FindGiftForm onComplete={handleGiftComplete} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
