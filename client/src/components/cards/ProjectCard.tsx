import React from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../../data/ProjectData";
import { seoSlug } from "../../utils/slug";
import "../../styles/ProjectCard.css";
import bed from "../../assets/stuff/bed.jpg";
import plot from "../../assets/stuff/property-type.jpg";
import ContactCard from "./ContactCard";

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const [showContactCard, setShowContactCard] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();

  const handleContact = (project: Project) => {
    setLocation(project.location);
    setTitle(project.title);
    setShowContactCard(true);
  };

  const handleRedirect = () => {
    navigate(
      `/projects/${project.category.toLowerCase()}/${seoSlug(
        project.title,
        project.location
      )}`
    );
  };

  const handleClose = () => {
    setLocation("");
    setTitle("");
    setShowContactCard(false);
  };

  return (
    <div className="custom-card-container">
      <div className="custom-card">
        <div className="card-header">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
          />
        </div>
        
        <div className="card-body">
          <h4 className="project-name">{project.title}</h4>
          
          <p className="project-location">
            <i className="bi bi-geo-alt-fill"></i>
            {project.location}
          </p>

          <div className="plot-type-and-price">
            <div className="plot-type">
              <div className="icon">
                <img src={bed} alt="bedroom configuration" />
              </div>
              <span>2, 3, 4 BHK</span>
            </div>
            <p className="price-detail">
              <i className="bi bi-currency-rupee"></i>
              {project.price}
            </p>
          </div>

          <div className="catagery">
            <div className="icon">
              <img src={plot} alt="property type" />
            </div>
            <span>{project.category}</span>
          </div>

          <div className="contact-btn-readmore-btn">
            <button
              className="custom-btn contact"
              onClick={() => handleContact(project)}
            >
              Contact
            </button>
            <button
              className="custom-btn read-more"
              onClick={handleRedirect}
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {showContactCard && (
        <ContactCard title={title} location={location} onClose={handleClose} />
      )}
    </div>
  );
};

export default ProjectCard;
