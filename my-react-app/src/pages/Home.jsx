import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <main>
        <h1>Bienvenue sur la page d'accueil de Kasa</h1>
        <p>Explorez nos appartements et nos services.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
