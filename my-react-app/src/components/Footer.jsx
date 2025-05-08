import logo from "../assets/kasa.svg";

/**
 * Footer component displaying logo and copyright information
 * @component
 * @returns {JSX.Element} Footer section with logo and copyright text
 */
function Footer() {
    return (
      <footer className='footer'>
        {/* 
         * SVG logo displayed using object tag
         * @type {JSX.Element}
         */}
        <object type="image/svg+xml" data={logo} className="footer__logo"></object>
        
        {/* Copyright text with current year */}
        <p className="footer__copyright">&copy; 2020 Kasa. All rights reserved</p>
      </footer>
    );
}
  
export default Footer;