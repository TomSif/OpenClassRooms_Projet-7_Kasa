import Header from '../components/Header';
import Footer from '../components/Footer';
import AppartementList from '../components/AppartementsList';


function Home() {
  return (
    <div className='body'>
      <Header />
      <main className='main'>
        <div className='main__title-container'>
          <h1 className='main__title'>Chez vous,<br className="no-break"></br>partout et ailleurs</h1>
        </div>
        <section>
          <AppartementList />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
