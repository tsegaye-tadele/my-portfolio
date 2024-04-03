import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import emailjs from '@emailjs/browser';
import TrackVisibility from 'react-on-screen';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const form = useRef(null);

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setButtonText("Sending...");

    emailjs.sendForm('service_cqjs08a', 'template_7fybiqp', form.current, {
      publicKey: 'CaasRmsHGU3S3AWjx',
    }).then((result) => {
      console.log(result.text);
      setButtonText("Send");
      setFormDetails(formInitialDetails);
      toast.success('Message sent successfully');
    }).catch((error) => {
      console.log(error.text);
      setButtonText("Send");
      setStatus({ success: false, message: 'Something went wrong, please try again later.'});
      toast.error('Something went wrong, please try again later.');
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newStatus = {};

    if (!formDetails.firstName.trim()) {
      newStatus.firstName = 'Please enter your first name';
      isValid = false;
    }

    if (!formDetails.lastName.trim()) {
      newStatus.lastName = 'Please enter your last name';
      isValid = false;
    }

    if (!formDetails.email.trim()) {
      newStatus.email = 'Please enter your email address';
      isValid = false;
    } else if (!validateEmail(formDetails.email)) {
      newStatus.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formDetails.message.trim()) {
      newStatus.message = 'Please enter your message';
      isValid = false;
    }

    setStatus(newStatus);
    return isValid;
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form ref={form} onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="firstName" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                      {status.firstName && <p className="text-danger">{status.firstName}</p>}
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="lastName" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                      {status.lastName && <p className="text-danger">{status.lastName}</p>}
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" name="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                      {status.email && <p className="text-danger">{status.email}</p>}
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" name="phone" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" name="message" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      {status.message && <p className="text-danger">{status.message}</p>}
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  )
}
