import { ThemeProvider } from './theme/ThemeProvider'
import { HeroSection } from './components/HeroSection'
import { ThemeToggle } from './components/ThemeToggle'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <ThemeToggle />
    </ThemeProvider>
  )
}

export default App
