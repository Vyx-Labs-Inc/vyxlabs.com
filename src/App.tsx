import { Hero } from './components/Hero'
import { WhatWeDo } from './components/WhatWeDo'
import { HowWeWork } from './components/HowWeWork'
import { FocusAreas } from './components/FocusAreas'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-vyx-darker">
      <main>
        <Hero />
        <WhatWeDo />
        <HowWeWork />
        <FocusAreas />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
