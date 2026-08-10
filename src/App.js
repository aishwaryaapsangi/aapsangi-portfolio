import React, { useState } from "react";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";
import PixelBlast from './components/PixelBlast';
import Cursor from './components/Cursor';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }
  return (
    <div className="App">
      <Cursor />
      <div className="background-wrap">
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="#B497CF"
          patternScale={1.4}
          patternDensity={0.1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.2}
          rippleThickness={0.12}
          rippleIntensityScale={0.5}
          liquid={false}
          liquidStrength={0.08}
          liquidRadius={1.2}
          liquidWobbleSpeed={3}
          speed={0.2}
          edgeFade={0.25}
          transparent
        />
      </div>
      <NavBar></NavBar>
      <div id="content">
        <Intro></Intro>
        <About></About>
        <Experience></Experience>
        <Projects></Projects>
        <Credits></Credits>
      </div>
    </div>
  );
}

export default App;
