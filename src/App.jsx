import React from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Navbar from './components/Navbar.jsx'
import Features from './components/Features.jsx'
import Story from './components/Story.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  alert("Turn the sound on from the top right for best experience. This a clone made for self development by developer Armaan.")
  
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />  
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
