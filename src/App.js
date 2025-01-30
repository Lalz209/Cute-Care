import './App.css';
import React, {useState, useEffect} from 'react';
import SlidingTextBar from './components/SlidingTextBar';
import Popup from './components/popup';
import axios from 'axios';
import { gridItems, availableServices, descriptions } from './data';

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const itemWidth = document.querySelector('.grid-item')?.offsetWidth || 0;
    const [opinions, setOpinions] = useState([]);
    const [name, setName] = useState('');
    const [services, setServices] = useState([]);
    const [comment, setComment] = useState('');
    const [filter, setFilter] = useState([]);
    const [errors, setErrors] = useState({});
    const [isCommentsPopupOpen, setIsCommentsPopupOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      loadOpinions(currentPage);
      }, [filter, currentPage]);


    const loadOpinions = async (page) => {

      try {
      const response = await axios.get('http://localhost:5000/opinions', {
        params: { services: filter.join(','), page, limit:5 },
        });
        setOpinions(response.data.opinions);
        setTotalPages(response.data.totalPages);
        
      } catch (error) {
        console.error('error loading opinions', error);
        }
      }
      
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const renderPagination = () => {
      const pages = [];
      const maxPagesToShow = 5;
  
      // Si hay menos de 2 páginas, no mostrar paginación
      if (totalPages < 2) {
          return null;
      }
  
      // Botón de "Anterior"
      if (currentPage > 1) {
          pages.push(
              <button className='pag-arrows-btn' key="prev" onClick={() => handlePageChange(currentPage - 1)}>
                  <img class = "pag-arrows"  src="paginacion derecha.png" alt="Previous" />
              </button>
          );
      }
  
      // Mostrar todas las páginas si hay menos de 5
      if (totalPages <= maxPagesToShow) {
          for (let i = 1; i <= totalPages; i++) {
              pages.push(
                  <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      disabled={i === currentPage}
                  >
                      {i}
                  </button>
              );
          }
      } else {
          // Lógica para mostrar solo 5 páginas
          const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
          let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
          let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);
  
          if (currentPage <= halfMaxPagesToShow) {
              endPage = maxPagesToShow;
          } else if (currentPage >= totalPages - halfMaxPagesToShow) {
              startPage = totalPages - maxPagesToShow + 1;
          }
  
          // Mostrar el primer número si no está en el rango
          if (startPage > 1) {
              pages.push(
                  <button key={1} onClick={() => handlePageChange(1)}>
                      {1}
                  </button>
              );
              if (startPage > 2) {
                  pages.push(<span className='ellipsis' key="ellipsis-start">...</span>);
              }
          }
  
          // Mostrar los números de página en el rango calculado
          for (let i = startPage; i <= endPage; i++) {
              pages.push(
                  <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      disabled={i === currentPage}
                  >
                      {i}
                  </button>
              );
          }
  
          // Mostrar el último número si no está en el rango
          if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                  pages.push(<span className='ellipsis' key="ellipsis-end">...</span>);
              }
              pages.push(
                  <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                  </button>
              );
          }
      }
  
      
      if (currentPage < totalPages) {
          pages.push(
              <button class = "pag-arrows-btn" key="next" onClick={() => handlePageChange(currentPage + 1)}>
                  <img class = "pag-arrows" src="paginacion izq.png" alt="Next" />
              </button>
          );
      }
  
      return pages;
  };

        
    const submitOpinion = async (e) => {
      e.preventDefault();
      setErrors({});

      try{
        await axios.post('http://localhost:5000/opinions', {
          name,
          services,
          comment,
          });

          setName('');
          setServices([]);
          setComment('');
          setIsCommentsPopupOpen(false);
          loadOpinions();
          } catch(error) {
            if (error.response && error .response.status === 400) {
              const { data } = error.response;
              setErrors({...errors, ...data });
              }
          }
          };

    const maxPages = Math.ceil(itemsPerPage);

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
        <div className='nav-contents'>
          <div className='logo-nav'>
            <img className='img-logo-nav' src='recurso 5.png' alt='logo'/>
          </div>
          <div className='nav-social-media'>
            <a target="_blank" href='https://wa.me/523310684078?text=Hola!%20Me%20interesa%20informaci%C3%B3n'><img className='social-img' src='recurso 6.png' alt='wpp'/></a>
            <a target="_blank" className='social-img' href='https://www.instagram.com/cuteandcare.db/'><img className='social-img' src='recurso 7.png' alt='instagram'/></a>
          
          </div>
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
          <div className="arrow-btn">
            <button className="nav-btn-left" onClick={handlePrev}>
              <img className="btn-img" src="felcha iz.png" alt="Left arrow" />
            </button>
          </div>
        <div className="grid-wrapper">
          <div
            className="grid"
            style={{
              transform: `translateX(-${currentIndex * itemsPerPage * itemWidth}px)`,
            }}
          >
            {gridItems.map((src, index) => (
              <div className="grid-item" key={index}>
                <div className='grid-item-content'>
                  <div className='grid-item-img'>
                    <img className="grid-img" src={src} alt={`img ${index + 1}`} />
                  </div>
                  <div className='grid-item-title'>
                    <h2 className="grid-title">{availableServices[index]}</h2>
                  </div>
                  <div className='grid-item-description'>
                    <h4 className='grid-description'>{descriptions[index]}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="arrow-btn">
          <button className="nav-btn-right" onClick={handleNext}>
            <img className="btn-img" src="flecha de.png" alt="Right arrow" />
          </button>
        </div>
      </div>

      {/* promo announcement */}
      

      <div className='promo-text-container'>
        <p className='p-text'>promos & paquetes</p>
        <p className='p-text'>diferentes cada mes especiales para ti</p>
        <img className='promo-text-img' src='isotipo b.png' alt='promo'/>
      </div>

                { /* opinions header */}
      <div className='opinions-header'>
        <p className='opinions-text'>Opiniones de clientes</p>
      </div>
 
          {/* Filter opinions */}

        <div className='filter-btn-container'>
               
        <select value={filter} onChange={(e) => setFilter([...e.target.selectedOptions].map((option) => option.value))}>
          <option value=''>Filtros</option>
          {availableServices.map((services) => (
          <option key={services} value={services}>
            {services}
          </option>
          ))}
        </select>
      </div>

            {/* opinions container */}

      <div className='opinions-container'>
        {opinions.map((opinion) => (
          <div className='opinion' key={opinion._id}>
            <div className='opinion-header'>
              <h4 className='name'>{opinion.name}</h4>
              <p className='date'>{new Date(opinion.date).toLocaleDateString()}</p>
            </div>
            <p className='comment'>{opinion.comment}</p>
            <p className='used-services'>Servicios: {opinion.services.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className='pagination'>
        {renderPagination()}
      </div>
      

             {/* form container */}
      <div className='btn-form'>
      <button className='btn-c' type='button' onClick={() => setIsCommentsPopupOpen(true)}><img  className='final-pictures' src='opinion.png' alt='Boton para hacer comentario'/></button> 
      <a target="_blank" href='https://wa.me/523310684078?text=Hola!%20Me%20interesa%20informaci%C3%B3n'><img  className='final-pictures' src='agenda cita.png' alt='wpp'/></a>
      </div>
      <div className='form-container'>
      <Popup isOpen={isCommentsPopupOpen} onClose={() => setIsCommentsPopupOpen(false)}>
        <form onSubmit={submitOpinion}>
          <div className='comment-form'>
            <h3 className='popup-name-h'>Nombre</h3>
            <div className='name-form'>
              <input
              className='input-name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.error === 'Por favor, ingrese un nombre.' && <p className='error-message'>{errors.error}</p>}
            </div>

            <div className='services-form'>
              <p className='serv-form'>Servicios contratados</p>
              <div className='services-boxes'>
              {availableServices.map((service) => (
                <label key={service} className="checkbox-label">
                  <input
                  className='box-option'
                    type="checkbox"
                    value={service}
                    checked={services.includes(service)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setServices([...services, service]);
                      } else {
                        setServices(services.filter((s) => s !== service));
                      }
                    }}
                  />
                  <span className="checkbox-text">{service}</span>
                  
                  
                </label>
                
              ))}
              </div>
              {errors.error === 'Por favor introduce un servicio.' && (
                <p className="error-message">{errors.error}</p>
              )}
            </div>

            <div className='commenttxt-form'>
              <h3 className='tell-opinion'>Cuéntanos tu opinión</h3>
              <textarea
              className='textarea'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
                 {errors.error === 'Por favor introduce un comentario.' && (
                  <p className="error-message">{errors.error}</p>
                  )}
                <button className='submit-btn' type='submit'>Enviar</button>  
              
            </div>
          </div>      
        </form>
        </Popup>
    </div>
    <div className='bna-container'>
      <div className='bna-title'>
        <h2 className='bna-title-text'>Antes Y Despues</h2>
      </div>
      <div className='bna-imgs'>
        <img className='bna-img' src='bna1.png' alt='bna'/>
        <img className='bna-img' src='bna2.png' alt='bna'/>
      </div>
    </div>
    <div className='footer'>
      <p>© COPYTIGHT, 2025 Cute and Care DESARROLLADO Matcha Studio / Lalz</p>
    </div>

    </div>
  );
}

export default App;
