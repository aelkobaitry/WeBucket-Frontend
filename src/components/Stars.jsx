import Particles from "react-tsparticles";
import React, { useCallback } from "react";
import { loadStarsPreset } from "tsparticles-preset-stars";

const Stars = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  const options = {
    preset: "stars",
    background: {
      color: {
        value: "#000421",
      },
    },
    particles: {
      size: {
        random: true,
        value: 2,
      },
      move: {
        speed: 0.5,
      },
    },
    fullScreen: {
      enable: true,
      //changed to zero to account for mantine provider interference (using mantine for the static carousel)
      zIndex: 0,
    },
  };
  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default Stars;
