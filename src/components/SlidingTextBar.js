import React, { useState, useEffect } from "react";
import "./SlidingTextBar.css";

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
const SlidingTextBar = () => {
  const texts = ["Contáctame para conocer las promos del mes", "En mi self care era"];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 7000); 

    return () => clearInterval(interval);
  }, [texts.length]);

  return (

    
    <div className="sliding-text-bar">
      <div className="text-container">
      
        <span
        
          key={currentIndex} 
          className="sliding-text active"
        >
          <img className='img-logo-nav' src='Isotipo.png' alt='logo'/>
          {texts[currentIndex]}
          
        </span>
      </div>
    </div>


  );
};

export default SlidingTextBar;

