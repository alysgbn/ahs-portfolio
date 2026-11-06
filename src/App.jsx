import "./App.scss";

import MyNavbar from "./components/Navbar";
import HeroOrbit from "./components/HeroOrbit";
import Journey from "./components/Journey";
import Craft from "./components/Craft";
import About from "./components/About";
import Manifesto from "./components/Manifesto";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import StoryBackdrop from "./components/StoryBackdrop";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
      <ScrollProgress />
      <MyNavbar className="w-100" />
      <HeroOrbit />
      <StoryBackdrop>
        <About />
        <Manifesto />
      </StoryBackdrop>
      <Journey />
      <Experience />
      <Skills />
      <Craft />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
