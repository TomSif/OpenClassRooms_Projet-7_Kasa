import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';



function Error() {
  return (
    <div>
        <Header />
            <div  className='error__container'>
                <h1 className='error__title'>404</h1>
                <h2 className='error__text'>Oups! La page que vous demandez n'existe pas.</h2> 
                <Link to="/" className='error__link'>Retourner sur la page d'accueil</Link>
            </div>     
        <Footer />
    </div>
  );
}

export default Error;
