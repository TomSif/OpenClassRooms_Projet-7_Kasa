import Header from '../components/Header';
import Footer from '../components/Footer';


function Error() {
  return (
    <div>
        <Header />
            <div  className='error__container'>
                <h1 className='error__title'>404</h1>
                <h2 className='error__text'>Oups! La page que vous demandez n'existe pas.</h2> 
                <a href="">Retourner sur la page d'acceuil</a>
            </div>     
        <Footer />
    </div>
  );
}

export default Error;
