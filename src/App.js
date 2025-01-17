import './App.css';
import React, {useState, useEffect} from 'react';
import SlidingTextBar from './components/SlidingTextBar';
import axios from 'axios';

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const itemWidth = window.innerHeight * 0.28;
    const [opinions, setOpinions] = useState([]);
    const [name, setName] = useState('');
    const [services, setServices] = useState('');
    const [comment, setComment] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
      loadOpinions();
      }, [filter]);


    const loadOpinions = async () => {
      const response = await axios.get('http://localhost:5000/opinions', {
        params: { service:filter },
        });
        setOpinions(response.data);
        };
      
      const submitOpinion = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/opinions', {
          name,
          services,
          comment,
          });
          setName('');
          setServices([]);
          setComment('');
          loadOpinions();
          };

    const gridItems = [
      'recurso 11.png', 'recurso 11.png', 'recurso 11.png', 
      'recurso 11.png', 'recurso 11.png', 'recurso 11.png', 
      'recurso 11.png', 'recurso 11.png', 'recurso 11.png',
      'recurso 11.png','recurso 11.png', 'recurso 11.png',
      'recurso 11.png'];

      const availableServices = ['cavitacion1', 'cavitacion2',
       'cavitacion3','cavitacion4','cavitacion5','cavitacion6',
       'cavitacion7','cavitacion8','cavitacion9','cavitacion10',
       'cavitacion11','cavitacion12','cavitacion13']

    const maxPages = Math.ceil(gridItems.length / itemsPerPage);

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

      {/* promo announcement */}

      <div className='promo-text-container'>
        <p className='p-text'>promos & paquetes</p>
        <p className='p-text'>diferentes cada mes especiales para ti</p>
        <img className='promo-text-img' src='isotipo.png' alt='promo'/>
      </div>

                { /* opinions header */}
      <div className='opinions-header'>
        <p className='opinions-text'>Opiniones de clientes</p>
      </div>
 
          {/* opinions container */}

      <div>
        <h3>Filtrar por servicio</h3>
        <select multiple value={filter} onChange={(e) => setFilter([...e.target.selectedOptions].map((option) => option.value))}>
          <option value=''>Todos</option>
          {availableServices.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
          ))}
        </select>
      </div>


      <div className='opinions-container'>
        {opinions.map((opinion) => (
          <div className='opinion' key={opinion._id}>
            <div className='opinion-header'>
              <h4 className='name'>{opinion.name}</h4>
              <p>{new Date(opinion.date).toLocaleDateString()}</p>
            </div>
            <p className='comment'>{opinion.comment}</p>
            <p className='used-services'>Servicios: {opinion.services.join(', ')}</p>
          </div>
        ))}
      </div>

             {/* form container */}
      <div className='form-container'>
        <form onSubmit={submitOpinion}>
          <input
            type='text'
            placeholder='Nombre'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select  multiple value={services} onChange={(e) => setServices([...e.target.selectedOptions].map((option) => option.value))}>
            <option value=''>Seleccione un servicio</option>
              {availableServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                  </option> 
                ))}
          </select>
                <textarea
                  placeholder='Comentario'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  />
                  <button type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
