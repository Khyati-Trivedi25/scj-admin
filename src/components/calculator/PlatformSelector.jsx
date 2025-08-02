import React from "react";
import youtubeLogo from "./assets/youtube.jpeg";
import facebookLogo from "./assets/facebook.jpeg";
import jiocinemaLogo from "./assets/jiocinema.jpeg";
import sonyLogo from "./assets/sony.jpeg";
import hotstarLogo from "./assets/hotstar.jpeg";

const platformData = [
  { name: "YouTube", logo: youtubeLogo },
  { name: "Facebook", logo: facebookLogo },
  { name: "JioCinema", logo: jiocinemaLogo },
  { name: "SonyLIV", logo: sonyLogo },
  { name: "Hotstar", logo: hotstarLogo },
];

const PlatformSelector = ({ selectedPlatforms = [], setSelectedPlatforms }) => {
  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev = []) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="scj-platform-selector">
      <p>Select Platforms:</p>
      <div className="scj-platform-grid">
        {platformData.map(({ name, logo }) => {
          const selected = selectedPlatforms.includes(name);
          return (
            <button
              key={name}
              type="button"
              onClick={() => togglePlatform(name)}
              className={`scj-platform-button ${selected ? "selected" : ""}`}
            >
              <img
                src={logo}
                alt={name + " logo"}
                className={`scj-platform-logo ${name === 'YouTube' ? 'object-cover' : 'object-contain'}`}
                draggable={false}
              />
              <span className="scj-platform-name">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector; 