import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import QuickAccess from '@/components/QuickAccess'
import Showreel from '@/components/Showreel'
import Portfolio from '@/components/Portfolio'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <QuickAccess />
      <Showreel />
      <Portfolio />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
