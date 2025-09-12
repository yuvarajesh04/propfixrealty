import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'

import propfixRealtyIcon from '../assets/profixrealtyicon.jpg';
import home from '../assets/footer/home.jpg';
import contact from '../assets/footer/location.jpg';
import trust from '../assets/footer/trust.jpg';

const footerData = [
  {
    icon: home,
    title: 'Buy a home',
    des: 'First Time Home Buyer Guide.'
  },
  {
    icon: contact,
    title: 'Contact Support',
    des: 'Get your queries resolved from our experts.'
  },
  {
    icon: trust,
    title: 'Trusted',
    des: 'A one stop solution for all your property needs.'
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="footer py-5" style={{ backgroundColor: 'var(--primary-color)' }}>
      <div className="container">
        <div className="text-center mb-4">
          <img
            src={propfixRealtyIcon}
            alt="Propfix Realty Icon"
            width={120}
            height={120}
            decoding="async"
            className="img-fluid"
          />
        </div>
        <h3 className="text-center fs-4 fw-semibold">We help our clients</h3>
        <h5 className="text-center fw-lighter">We are recognized for exceeding client</h5>
        <h5 className="text-center fw-lighter">expectations and delivering great results</h5>

        <Row className="my-5 justify-content-center">
          {footerData.map((data, index) => (
            <Col
              key={index}
              lg={4}
              md={6}
              sm={12}
              className="d-flex rounded flex-column align-items-center text-center p-4 m-2 c-footer-card"
            >
              <img
                src={data.icon}
                alt={data.title}
                className="footer-icon"
              />
              <h5 className="mb-2 title">{data.title}</h5>
              <h6 className="text-muted">{data.des}</h6>
            </Col>
          ))}
        </Row>

        <Row className="d-flex justify-content-around">
          <Col className="address-details flex-column text-start">
            <p><i className="bi bi-geo-alt-fill me-2" style={{ 
                  background: 'linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}></i> F2 block, No. 308, Ozone greens,<br/> Phase II Perumbakkam, Jalladianpet road</p>
                <p><i className="bi bi-envelope-fill me-2" style={{ 
                  background: 'linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}></i> arunkumar@propfixrealty.com</p>
                <p><i className="bi bi-telephone-fill me-2" style={{ 
                  background: 'linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}></i> +91-9789360885</p>
          </Col>
          <h5 className="fw-bold mb-3">Follow Us</h5>
                <div className="d-flex gap-3 fs-4">
                  <a href="https://www.facebook.com/propfixrealty"><i className="bi bi-facebook text-primary"></i></a>
                  <a href="https://www.instagram.com/propfixrealty/"><i className="bi bi-instagram text-danger"></i></a>
                  {/* <a href="#"><i className="bi bi-twitter text-info"></i></a> */}
                  {/* <a href="https://www.linkedin.com/in/propfix-realty-6a7602267/?originalSubdomain=in"><i className="bi bi-linkedin text-primary"></i></a> */}
                </div>
        </Row>

        <div className="text-center mt-4" style={{background: 'linear-gradient(135deg, #4f79ac, #08aef5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          © {new Date().getFullYear()} Propfix Realty. All rights reserved.
          <div className="mt-2">
            <Link className="text-muted small" to="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
