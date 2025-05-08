import Header from '../components/Header';
import Footer from '../components/Footer';
import Collapse from '../components/Collapse';

/**
 * About page component displaying company values in collapsible sections
 * @component
 * @returns {JSX.Element} About page layout with header, content sections, and footer
 */
function About() {
  return (
    <div className="body">
      {/* Header component */}
      <Header />
      
      {/* Main content section */}
      <main className="about">
        <div className="about__title-container"></div>
        
        {/* 
         * Container for collapsible content sections
         * @type {JSX.Element}
         */}
        <div className="about-details-container">
          <Collapse title="Reliability">
            The ads posted on Kasa guarantee total reliability. The photos match the accommodations, and all information is regularly verified by our teams.
          </Collapse>
          
          <Collapse title="Respect">
            Kindness is one of Kasa's founding values. Any discriminatory behavior or neighborhood disturbance will result in exclusion from our platform.
          </Collapse>
          
          <Collapse title="Service">
            Service quality is at the heart of our commitment at Kasa. We ensure that every interaction, whether with our hosts or tenants, is marked by respect and kindness.
          </Collapse>
          
          <Collapse title="Security">
            Security is Kasa's priority. For both our hosts and travelers, each accommodation meets the security criteria established by our services. By leaving ratings for both hosts and tenants, our teams can verify that standards are being respected. We also organize domestic security workshops for our hosts.
          </Collapse>
        </div>
      </main>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default About;