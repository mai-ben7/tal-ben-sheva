import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import QuickAccess from '@/components/QuickAccess'
import Showreel from '@/components/Showreel'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <QuickAccess />
      <Showreel />
      <About />
      <Portfolio />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
