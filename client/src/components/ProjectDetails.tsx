import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Carousel, Button, Spinner, Accordion, Breadcrumb } from "react-bootstrap";
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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
          <p className="text-secondary mb-4">The project you're looking for doesn't exist or has been moved.</p>
          <button onClick={() => window.history.back()} className="btn btn-outline-primary px-4 py-2">
            <i className="bi bi-arrow-left me-2"></i>Go Back
          </button>
        </div>
      </div>
    );
  }

  /** ✅ Breadcrumb schema JSON-LD */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://propfixrealty.com/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: Capitalize(project.type) + " Projects",
        item: `https://propfixrealty.com/projects/${category}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://propfixrealty.com/projects/${category}/${slug}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{`${project.title} - Plots in ${project.location} | Propfix Realty`}</title>
        <meta name="description" content={`Buy DTCP approved plots at ${project.title}, ${project.location}. Best price, ready-to-build residential plots in Chennai. Book your site visit now!`} />
        <link rel="canonical" href={`https://propfixrealty.com/projects/${category}/${slug}`} />

        {/* ✅ Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: project.title,
            description: `Residential ${project.type} in ${project.location}.`,
            url: `https://propfixrealty.com/projects/${category}/${slug}`,
            image: project.images?.map((imgUrl: string) => `https://propfixrealty.com${imgUrl}`),
            address: {
              "@type": "PostalAddress",
              addressLocality: project.location,
              addressRegion: "Tamil Nadu",
              addressCountry: "IN",
            },
            offers: {
              "@type": "Offer",
              price: project.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            seller: {
              "@type": "Organization",
              name: "Propfix Realty",
              logo: "https://propfixrealty.com/logo.png",
              sameAs: [
                "https://www.facebook.com/propfixrealty",
                "https://www.instagram.com/propfixrealty",
              ],
            },
          })
        }} />

        {/* ✅ FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `Is ${project.title} DTCP approved?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Yes, ${project.title} plots in ${project.location} are fully DTCP approved with clear titles.` }
              },
              {
                "@type": "Question",
                "name": `What is the starting price of plots in ${project.title}?`,
                "acceptedAnswer": { "@type": "Answer", "text": `The starting price of plots in ${project.title}, ${project.location} is ₹${project.price} onwards.` }
              },
              {
                "@type": "Question",
                "name": `Where is ${project.title} located?`,
                "acceptedAnswer": { "@type": "Answer", "text": `${project.title} is located in ${project.location}, Chennai with excellent connectivity to schools, highways, and IT hubs.` }
              },
              {
                "@type": "Question",
                "name": `Why should I invest in plots at ${project.location}?`,
                "acceptedAnswer": { "@type": "Answer", "text": `${project.location} is one of Chennai's fastest developing areas with upcoming infrastructure projects, making it a great choice for real estate investment.` }
              }
            ]
          })
        }} />

        {/* ✅ Breadcrumb JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Helmet>

      <section className="project-detail-section container">
        {/* ✅ Visible Breadcrumbs */}
        <Breadcrumb className="px-4 mt-3">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: `/projects/${category}` }}
          >
            {Capitalize(project.type)}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{project.title}</Breadcrumb.Item>
        </Breadcrumb>


        <div className="project-header-with-title py-3 px-4 mb-3 text-center text-md-start">
          <h1 className="fs-3 fw-bold">{`${Capitalize(project.type)} in ${project.location} - ${project.title}`}</h1>
          <div className="location-and-price mt-2">
            <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>{project.location}</p>
            <p className="mb-0">Starting from <span className="price-tag fw-bold text-success">₹{project.price}</span></p>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-6 col-md-12">
            <Carousel fade interval={3000}>
              {project.images?.map((imgUrl: string, idx: number) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100 project-carousel-img rounded"
                    src={`https://propfixrealty.com${imgUrl}`}
                    alt={`Plots in ${project.location} - ${project.title} - Image ${idx + 1}`} // ✅ SEO alt
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="col-lg-6 col-md-12 p-4 rounded shadow-sm bg-light">
            <h5 className="mb-4 fw-bold text-decoration-underline gradient-text">Project Details</h5>
            <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={project.location} color="text-danger" />
            <DetailItem icon={<FaBuilding />} label="Builder" value={project.builder || "N/A"} color="text-secondary" />
            <DetailItem icon={<FaBed />} label="Size" value={`${project.size} Sqft`} color="text-success" />
            <DetailItem icon={<FaRegClock />} label="Status" value={project.status?.toString()} color="text-warning" />
            <DetailItem icon={<FaGlobe />} label="Total Land" value={project.totalland} color="text-primary" />
            <DetailItem icon={<FaRupeeSign />} label="Price" value={project.price} color="text-success" />
            <Button onClick={() => setShowContact(true)} className="mt-3 px-4 fw-semibold shadow-sm border-0 contact-btn">Contact</Button>
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

        {/* ✅ Visible FAQ Section */}
        <div className="faq-section p-3">
          <h2 className="mb-4 fw-bold text-decoration-underline gradient-text">Frequently Asked Questions</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Is {project.title} DTCP approved?</Accordion.Header>
              <Accordion.Body>Yes, {project.title} plots in {project.location} are fully DTCP approved with clear titles.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What is the starting price of plots in {project.title}?</Accordion.Header>
              <Accordion.Body>The starting price of plots in {project.title}, {project.location} is ₹{project.price} onwards.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Where is {project.title} located?</Accordion.Header>
              <Accordion.Body>{project.title} is located in {project.location}, Chennai with excellent connectivity to schools, highways, and IT hubs.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Why should I invest in plots at {project.location}?</Accordion.Header>
              <Accordion.Body>{project.location} is one of Chennai's fastest developing areas with upcoming infrastructure projects, making it a great choice for real estate investment.</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        {showContact && <ContactCard title={project.title} location={project.location} onClose={() => setShowContact(false)} />}
      </section>
    </>
  );
}
