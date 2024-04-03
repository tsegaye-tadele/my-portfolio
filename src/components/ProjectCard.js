import React from "react";
import { Col, Button } from "react-bootstrap";
import "./ProjectCard.css" 

export const ProjectCard = ({ title, description, imgUrl, demoLink }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
         
        </div>
      </div>
      
        <Button variant="primary" className=" mt-2 custom-button" href={demoLink} target="_blank" rel="noopener noreferrer">
          SEE LIVE DEMO
        </Button>
        
    </Col>
  );
};
