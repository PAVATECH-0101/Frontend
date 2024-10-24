import React from 'react';
import './Footer.css'; // Custom footer styling

const Footer = () => {
  return (
    <section className="footer-2 section-padding gray-bg pb-5">
      {/* Footer Bottom */}
      <div className="footer-btm mt-5 pt-4 border-top">
        <div className="row">
          <div className="col-lg-12">
            <ul className="list-inline footer-socials-2 text-center">
              <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
              <li className="list-inline-item"><a href="#">Support</a></li>
              <li className="list-inline-item"><a href="about.html">About</a></li>
              <li className="list-inline-item"><a href="contact.html">Contact</a></li>
              <li className="list-inline-item"><a href="#">Terms</a></li>
              <li className="list-inline-item"><a href="fashion.html">Category</a></li>
            </ul>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="copyright text-center">
              © All rights reserved to <a href="https://github.com/VincentAgunda" target="_blank" rel="noopener noreferrer">Pavadtech.com</a> - 2024 Distribution <a href="https://github.com/VincentAgunda" target="_blank" rel="noopener noreferrer">Vincify</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
