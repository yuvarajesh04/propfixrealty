import React from "react";
import { Link } from "react-router-dom";
import { seoSlug } from "../../utils/slug";
import "../../styles/ProjectCard.css";
import bed from "../../assets/stuff/bed.jpg";
import plot from "../../assets/stuff/property-type.jpg";
import ContactCard from "./ContactCard";
import projectApi from "../../services/projectApi";
import { useNavigate } from "react-router-dom";

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
  const BASE_URL = "https://propfixrealty.com";
  const navigate = useNavigate();

  const Capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const handleContact = (p: Project) => {
    setLocation(p.location);
    setTitle(p.title);
    setShowContactCard(true);
  };

  async function handleDelete(id: string) {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this project?"
      );

      if (confirmDelete) {
        const res = await projectApi.deleteProject(id);

        if (res.success) {
          alert("Project deleted successfully");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  }

  // ✅ SEO-friendly project URL
  const projectUrl = `/projects/${project.type.toLowerCase()}/${seoSlug(
    project.title,
    project.location
  )}`;

  const handleClose = () => {
    setLocation("");
    setTitle("");
    setShowContactCard(false);
  };

  function handleEdit (id: string) {
    navigate(`/admin/edit-project/${id}`)
  }

  // ✅ JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.title,
    description: project.des,
    url: `https://propfixrealty.com${projectUrl}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location,
      addressRegion: "Chennai",
      addressCountry: "India",
    },
    offers: {
      "@type": "Offer",
      price: project.price,
      priceCurrency: "INR",
      url: `https://propfixrealty.com${projectUrl}`,
      availability:
        project.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
    image: project.images.map((img) => BASE_URL + img),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Property Type",
        value: project.type,
      },
      {
        "@type": "PropertyValue",
        name: "Size",
        value: project.size,
      },
      {
        "@type": "PropertyValue",
        name: "Total Land",
        value: project.totalland,
      },
    ],
  };

  return (
    <div className="custom-card-container">
      <div className="custom-card">
        {/* ✅ Image with descriptive alt */}
        <div className="card-header">
          <Link to={projectUrl}>
            <img
              src={BASE_URL + project.images[0]}
              alt={`${project.title} in ${project.location}`}
              loading="lazy"
            />
          </Link>
        </div>

        <div className="card-body">
          <h4 className="project-name">
            <Link to={projectUrl} style={{ textDecoration: 'none', color: 'inherit' }}>{Capitalize(project.title)}</Link>
          </h4>

          <div className="d-flex justify-content-between align-items-center">
            <p className="project-location">
              <i
                className="bi bi-geo-alt-fill"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              ></i>
              {Capitalize(project.location)}
            </p>

            {/* ✅ Show delete button only for logged-in admins */}
            {localStorage.getItem("token") && (
              <div style={{ display: "flex", gap: "10px" }}>
                <i
                  className="bi bi-pencil-square text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(project._id)}
                  aria-label="Edit project"
                />
                <i
                  className="bi bi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(project._id)}
                  aria-label="Delete project"
                />
              </div>
            )}

          </div>

          {/* ✅ Plot Size & Price */}
          <div className="plot-type-and-price">
            <div className="plot-type">
              <div className="icon">
                <img src={bed} alt="Bedroom configuration" loading="lazy" />
              </div>
              <span>{project.size}</span>
            </div>
            <p className="price-detail">
              <i className="bi bi-currency-rupee"></i>
              {project.price}
            </p>
          </div>

          {/* ✅ Category */}
          <div className="catagery">
            <div className="icon">
              <img src={plot} alt="Property type" loading="lazy" />
            </div>
            <span>{Capitalize(project.type)}</span>
          </div>

          {/* ✅ Buttons */}
          <div className="contact-btn-readmore-btn">
            <button
              className="custom-btn contact"
              onClick={() => handleContact(project)}
              style={{
                background:
                  "linear-gradient(135deg, rgb(61, 100, 145), rgb(6, 147, 211))",
              }}
            >
              Enquiry
            </button>
            <Link to={projectUrl} style={{ textDecoration: 'none', color: '#fff' }} className="custom-btn read-more">
              Read More
            </Link>
          </div>
        </div>
      </div>

      {showContactCard && (
        <ContactCard title={title} location={location} onClose={handleClose} />
      )}

      {/* ✅ Inject JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </div>
  );
};

export default ProjectCard;
