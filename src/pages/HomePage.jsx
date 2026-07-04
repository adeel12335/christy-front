import ParticleCanvas from '../components/UI/ParticleCanvas'
import Header from '../components/Layout/Header'
import Hero from '../components/Home/Hero'
import Marquee from '../components/Home/Marquee'
import About from '../components/Home/About'
import MovementStatement from '../components/Home/MovementStatement'
import EventVisual from '../components/Home/EventVisual'
import Pillars from '../components/Home/Pillars'
import EventDetail from '../components/Home/EventDetail'
import Gallery from '../components/Home/Gallery'
import Artists from '../components/Home/Artists'
import RSVP from '../components/Home/RSVP'
import Footer from '../components/Layout/Footer'

export default function HomePage() {
  return (
    <>
      <ParticleCanvas />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <MovementStatement />
        <EventVisual />
        <Pillars />
        <EventDetail />
        <Gallery />
        <Artists />
        <RSVP />
      </main>
      <Footer />
    </>
  )
}
