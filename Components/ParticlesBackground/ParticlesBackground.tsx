import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const App = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

 const options: ISourceOptions = useMemo(
  () => ({
    // 1. Isse particles poore page ki jagah sirf apne container div mein rahenge
    fullScreen: { enable: false }, 
    
    // 2. Background ko transparent rakhein taaki aapka dark blue box color nazar aaye
    background: {
      color: {
        value: "transparent", 
      },
    },
    fpsLimit: 500,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Image jaisa mesh effect dene ke liye 'grab' best hai
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 1,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.2, // Light mesh look ke liye opacity kam rakhein
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 1, // 6 bahut fast tha, slow speed se professional mesh look aayega
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 250, // Container size ke hisaab se quantity adjust karein
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  }),
  [],
);
  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default App;
