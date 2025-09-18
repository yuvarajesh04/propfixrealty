import React from "react";
import { useNavigate } from "react-router-dom";
import { seoSlug } from "../../utils/slug";
import "../../styles/ProjectCard.css";
import bed from "../../assets/stuff/bed.jpg";
import plot from "../../assets/stuff/property-type.jpg";
import ContactCard from "./ContactCard";
import projectApi from "../../services/projectApi";

interface Project {
  _id: string;
  title: string;
  des: string;
  location: string;
  size: string;
  builder: string;
  totalland: string;
  price: string;
  type: "villa" | "apartment" | "plot";
  status: string;
  nearby: { type: string; name: string; distance: string }[];
  amenities: string[];
  images: string[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [showContactCard, setShowContactCard] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();
  const BASE_URL = "http://13.201.38.254";

  const handleContact = (p: Project) => {
    setLocation(p.location);
    setTitle(p.title);
    setShowContactCard(true);
  };

  function Capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleDelete(id: string) {
    try {
      const confirm = window.confirm('Are you sure delete this project ?')

      if (confirm) {
        const res = await projectApi.deleteProject(id);

        if (res.success) {
          alert('Project deleted success')
        }
      }
    } catch (error) {
      console.log('Delete error:', error)
    }
  }


  const handleRedirect = () => {
    navigate(
      `/projects/${project.type.toLowerCase()}/${seoSlug(
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
            src={BASE_URL + project.images[0]}
            alt={project.title}
            loading="lazy"
          />
        </div>

        <div className="card-body">
          <h4 className="project-name">{Capitalize(project.title)}</h4>

          {
            localStorage.getItem('token') ? (
              <div className="d-flex justify-content-between align-items-center">
                <p className="project-location">
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{
                      background: "linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  ></i>
                  {Capitalize(project.location)}
                </p>

                <i
                  className="bi bi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(project._id)}
                />


              </div>
            ) : (
              <p className="project-location">
                <i
                  className="bi bi-geo-alt-fill"
                  style={{
                    background: "linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                ></i>
                {Capitalize(project.location)}
              </p>
            )
          }


          <div className="plot-type-and-price">
            <div className="plot-type">
              <div className="icon">
                <img src={bed} alt="bedroom configuration" />
              </div>
              <span>{project.size} Sqft</span>
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
            <span>{Capitalize(project.type)}</span>
          </div>

          <div className="contact-btn-readmore-btn">
            <button
              className="custom-btn contact"
              onClick={() => handleContact(project)}
              style={{ background: 'linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))' }}
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
      </div >

      {showContactCard && (
        <ContactCard title={title} location={location} onClose={handleClose} />
      )}
    </div >
  );
};

export default ProjectCard;
