import logo from "../assets/kasa.svg";

function Footer() {
    return (
      <footer className='footer'>
        <object type="image/svg+xml" data={logo} className="footer__logo"></object>
        <p className="footer__copyright">&copy; 2020 Kasa. All rights reserved</p>
      </footer>
    );
  }
  
  export default Footer;
  