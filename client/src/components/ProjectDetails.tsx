import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaBed,
  FaRegClock,
  FaGlobe,
  FaRupeeSign,
} from "react-icons/fa";
import ContactCard from "./cards/ContactCard";
import NearFecility from "./cards/NearFecility";
import projectApi from "../services/projectApi";
import "../styles/ProjectDetails.css";

/** ✅ Generate SEO-friendly slug */
export const seoSlug = (title: string, location: string) => {
  return `${title}-${location}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces/special chars with "-"
    .replace(/^-+|-+$/g, "");    // remove leading/trailing hyphens
};

const Capitalize = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const DetailItem = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  color?: string;
}) => (
  <h6 className="mb-3 d-flex align-items-center">
    <span className={`me-2 ${color}`}>{icon}</span>
    <span className="text-muted">{label}:</span>&nbsp;
    <span className="fw-semibold">{value}</span>
  </h6>
);

export default function ProjectDetails() {
  const { category, slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const res = await projectApi.getProjects();
        if (res && res.length > 0) {
          const found = res.find(
            (p: any) =>
              p.type?.toLowerCase() === category?.toLowerCase() &&
              seoSlug(p.title, p.location) === slug
          );
          setProject(found || null);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, slug]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="text-center">
          <div className="mb-4">
            <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: "3rem" }}></i>
          </div>
          <h1 className="text-muted mb-3">Project Not Found</h1>
          <p className="text-secondary mb-4">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <button onClick={() => window.history.back()} className="btn btn-outline-primary px-4 py-2">
            <i className="bi bi-arrow-left me-2"></i>Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} in ${project.location} | ${Capitalize(project.type)} | Propfix Realty`}</title>
        <meta
          name="description"
          content={`Discover ${project.title}, a premium ${project.type} project located in ${project.location}. Explore amenities, nearby facilities, and pricing.`}
        />
        <link rel="canonical" href={`https://propfixrealty.com/projects/${category}/${slug}`} />
      </Helmet>

      <section className="project-detail-section container">
        <div className="project-header-with-title py-3 px-4 mb-3">
          <h1 className="fs-4 fw-bold">{project.title}</h1>
          <div className="location-and-price">
            <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>{project.location}</p>
            <p className="mb-0">Starting from <span className="price-tag fw-bold text-success">₹{project.price}</span></p>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <Carousel fade interval={3000}>
              {project.images?.map((imgUrl: string, idx: number) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100 project-carousel-img rounded"
                    src={`https://propfixrealty.com${imgUrl}`}
                    alt={`Slide ${idx + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="col-lg-6 p-4 rounded shadow-sm bg-light">
            <h5 className="mb-4 fw-bold text-decoration-underline gradient-text">Project Details</h5>
            <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={project.location} color="text-danger" />
            <DetailItem icon={<FaBuilding />} label="Builder" value={project.builder || "N/A"} color="text-secondary" />
            <DetailItem icon={<FaBed />} label="Size" value={`${project.size} Sqft`} color="text-success" />
            <DetailItem icon={<FaRegClock />} label="Status" value={project.status?.toString()} color="text-warning" />
            <DetailItem icon={<FaGlobe />} label="Total Land" value={project.totalland} color="text-primary" />
            <DetailItem icon={<FaRupeeSign />} label="Price" value={project.price} color="text-success" />
            <Button onClick={() => setShowContact(true)} className="mt-3 px-4 fw-semibold shadow-sm border-0 contact-btn">
              Contact
            </Button>
          </div>
        </div>

        <div className="project-description p-3">
          <h2 className="mb-2 fw-bold text-decoration-underline gradient-text">About the Project</h2>
          <p className="text-secondary text-justify">{project.des}</p>
        </div>

        <div className="nearby-facilities p-3">
          <h2 className="mb-4 fw-bold text-decoration-underline gradient-text">Nearby Facilities</h2>
          <div className="d-flex flex-wrap gap-3">
            {project.nearby?.map((facility: any, idx: number) => (
              <NearFecility key={idx} name={facility.name} distance={facility.distance} type={facility.type} />
            ))}
          </div>
        </div>

        <div className="project-amenities p-3">
          <h2 className="mb-4 fw-bold text-decoration-underline gradient-text">Amenities</h2>
          <ul className="amenities-list list-unstyled">
            {project.amenities?.map((amenity: string, idx: number) => (
              <li key={idx} className="d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                <span className="fw-semibold text-secondary">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>

        {showContact && <ContactCard title={project.title} location={project.location} onClose={() => setShowContact(false)} />}
      </section>
    </>
  );
}
