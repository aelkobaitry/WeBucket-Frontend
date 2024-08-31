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
      zIndex: -1,
    },
  };
  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default Stars;
