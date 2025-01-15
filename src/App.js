import './App.css';
import React, {useState, useEffect} from 'react';
import SlidingTextBar from './components/SlidingTextBar';

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;
    const itemWidth = 400;


    const gridItems = [
      'recurso 11.png', 'recurso 11.png', 'recurso 11.png', 
      'recurso 11.png', 'recurso 11.png', 'recurso 11.png', 
      'recurso 11.png', 'recurso 11.png', 'recurso 11.png',
      'recurso 11.png','recurso 11.png', 'recurso 11.png',
      'recurso 11.png'];

    const maxPages = Math.ceil(gridItems.length / itemsPerPage);

    /*const visibleItems = gridItems.slice(
      currentIndex * itemsPerPage,
      (currentIndex + 1) * itemsPerPage
    );*/
  
    /*useEffect(() => {
      const grid = document.querySelector('.grid');
      const offset = -(currentIndex * itemsPerPage * itemWidth);
      if (grid) {
        grid.style.width = `${gridItems.length * itemWidth}px`;
        grid.style.transform = `translateX(${offset}px)`;

      }
    }, [currentIndex, itemsPerPage, itemWidth, gridItems.length]);*/
  
    const handleNext = () => {
      if (currentIndex < maxPages - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

  return (
    <div className="App">
      <div className='nav'>
        <div className='logo-nav'>
          <img className='img-logo-nav' src='recurso 5.png' alt='logo'/>
        </div>
        <div className='nav-social-media'>
          <a target="_blank" href='https://wa.me/523310684078?text=Hola!%20Me%20interesa%20informaci%C3%B3n'><img className='social-img' src='recurso 6.png' alt='wpp'/></a>
          <a target="_blank" className='social-img' href='https://www.instagram.com/cuteandcare.db/'><img className='social-img' src='recurso 7.png' alt='instagram'/></a>
         
        </div>
      </div>
      <div className='header'>
        <div className='main-img-container'>
          <img className='main-img' src='recurso 1.png' alt='p'/>
        </div>
        <div className='main-2-container'>
          <img className='img-p2' src='recurso 3.png' alt='p 2'/>
          <a className='sch-img-cont' target="_blank" href='https://wa.me/523310684078?text=Hola!%20Me%20interesa%20informaci%C3%B3n'><img  className='schedule-img' src='recurso 8.png' alt='wpp'/></a>
        </div>
      </div>
      <div>
        <SlidingTextBar />
      </div>
      <div className='service-img-container'>
        <img className='Service-img' src='recurso 10.png' alt='service'/>
      </div>

          {/*'Grid Container'*/}

          <div className="grid-container">
        <button className="nav-btn-left" onClick={handlePrev}>
          <img className="btn-img" src="felcha iz.png" alt="Left arrow" />
        </button>
        <div className="grid-wrapper">
          <div
            className="grid"
            style={{
              transform: `translateX(-${currentIndex * itemsPerPage * itemWidth}px)`,
            }}
          >
            {gridItems.map((src, index) => (
              <div className="grid-item" key={index}>
                <img className="grid-img" src={src} alt={`img ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <button className="nav-btn-right" onClick={handleNext}>
          <img className="btn-img" src="flecha de.png" alt="Right arrow" />
        </button>
      </div>
      
    </div>
  );
}

export default App;
