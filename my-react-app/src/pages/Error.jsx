import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

/**
 * Error (404) page component displayed when a route doesn't exist
 * @component
 * @returns {JSX.Element} 404 error page with navigation link
 */
function Error() {
  return (
    <div className="error-page">
      {/* Site header */}
      <Header />
      
      {/*
       * Main error content container
       * @type {JSX.Element}
       */}
      <div className='error__container'>
        <h1 className='error__title'>404</h1>
        <h2 className='error__text'>Oups! La page que vous demandez n'existe pas.</h2>
        
        {/*
         * Navigation link back to home
         * @type {JSX.Element}
         */}
        <Link to="/" className='error__link'>
          Retourner sur la page d'accueil
        </Link>
      </div>
      
      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default Error;