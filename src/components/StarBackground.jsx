import React from "react";
import { useState, useEffect } from "react";
import starImg from "../assets/icons/star.png";
import filledStar from "../assets/icons/filledStar.png";

const StarBackground = () => {

        const [stars, setStars] = useState([]); // Initialize with 100 stars

    useEffect(() => {
      const interval = setInterval(() => {
        const newStar = {
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * -10, // Start just above the view to make them fall into the view
          img: Math.random() > 0.5 ? starImg : filledStar // Randomly choose an image
        };
  
        setStars(prevStars => [...prevStars, newStar]);
  
        // Remove stars that have fallen out of view to prevent memory leaks
        setStars(prevStars => prevStars.filter(star => star.y < 100));
      }, 300); // Adjust time to control rate of star creation
  
      return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     const updateInterval = setInterval(() => {
    //       setStars((prevStars) =>
    //         prevStars.map((star) => ({
    //           ...star,
    //           y: star.y + 0.01, // Increment the y position to make the star fall
    //         }))
    //       );
    //     }, 100); // Adjust time to control the speed of falling
    
    //     return () => clearInterval(updateInterval);
    //   }, []);

    return (
        <div className="absolute w-full h-full overflow-hidden">
        {stars.map(star => (
            <img
            src={star.img}
            key={star.id}
            style={{
                position: 'absolute',
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: 10,
                height: 10,
            }}
            class="animate-move" // Tailwind classes for color and animation
            />
        ))}
        </div>
    );
}

export default StarBackground;