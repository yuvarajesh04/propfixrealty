import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import {
    FaMapMarkerAlt,
    FaBuilding,
    FaBed,
    FaRegClock,
    FaRulerCombined,
    FaGlobe,
    FaRupeeSign,
} from "react-icons/fa";

import { allProjects } from "../data/ProjectData";
import { seoSlug } from "../utils/slug";
import ContactCard from "./cards/ContactCard";
import NearFecility from "./cards/NearFecility";

import "../styles/ProjectDetails.css";

const Capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

/** Small reusable item for project details */
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
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setShowContact(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const project = allProjects?.find(
        (p) =>
            p.category?.toLowerCase() === category &&
            seoSlug(p.title, p.location) === slug
    );

    if (!project) {
        return (
            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{ minHeight: "50vh" }}
            >
                <div className="text-center">
                    <div className="mb-4">
                        <i
                            className="bi bi-exclamation-triangle text-warning"
                            style={{ fontSize: "3rem" }}
                        ></i>
                    </div>
                    <h1 className="text-muted mb-3">Project Not Found</h1>
                    <p className="text-secondary mb-4">
                        The project you're looking for doesn't exist or has been moved.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline-primary px-4 py-2"
                    >
                        <i className="bi bi-arrow-left me-2"></i>Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* 🔹 SEO & Schema */}
            <Helmet>
                {/* 🔹 Page Title & Meta Description */}
                <title>{`${project.title} in ${project.location} | ${Capitalize(project.category)} | Propfix Realty`}</title>
                <meta
                    name="description"
                    content={`Discover ${project.title}, a premium ${project.category} project located in ${project.location}. Explore amenities, nearby facilities, and pricing.`}
                />
                <link
                    rel="canonical"
                    href={`https://propfixrealty.com/projects/${category}/${slug}`}
                />

                {/* 🔹 Open Graph */}
                <meta property="og:title" content={`${project.title} in ${project.location} | Propfix Realty`} />
                <meta property="og:description" content={`Premium ${project.category} in ${project.location}. Starting from ₹${project.price}.`} />
                <meta property="og:url" content={`https://propfixrealty.com/projects/${category}/${slug}`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={project.images?.[0] || "https://propfixrealty.com/default-image.jpg"} />

                {/* 🔹 Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${project.title} in ${project.location} | Propfix Realty`} />
                <meta name="twitter:description" content={`Explore ${project.title} in ${project.location}. Contact Propfix Realty for more details.`} />
                <meta name="twitter:image" content={project.images?.[0] || "https://propfixrealty.com/default-image.jpg"} />

                {/* 🔹 Breadcrumb Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://propfixrealty.com/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Projects",
                                "item": `https://propfixrealty.com/${category}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": project.title,
                                "item": `https://propfixrealty.com/projects/${category}/${slug}`
                            }
                        ]
                    })}
                </script>

                {/* 🔹 ApartmentComplex / Real Estate Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ApartmentComplex",
                        "name": project.title,
                        "description": project.description,
                        "image": project.images?.[0] || "https://propfixrealty.com/default-image.jpg",
                        "url": `https://propfixrealty.com/projects/${category}/${slug}`,
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": project.location,
                            "addressCountry": "India"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": project.price?.toString(),
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        },
                        "amenityFeature": project.amenities?.map((a: string) => ({
                            "@type": "LocationFeatureSpecification",
                            "name": a,
                            "value": true
                        })),
                        "containedInPlace": {
                            "@type": "Place",
                            "name": project.location
                        }
                    })}
                </script>
            </Helmet>

            <section className="project-detail-section container">
                {/* 🔹 Project Header */}
                <div className="project-header-with-title py-3 px-4 mb-3">
                    <div className="row align-items-center">
                        <h1 className="fs-4 fw-bold col-lg-6">{project.title}</h1>
                        <p className="col-lg-6 text-lg-end text-muted fw-semibold">
                        </p>
                    </div>
                    <div className="location-and-price">
                        <p className="mb-1">
                            <i className="bi bi-geo-alt-fill me-2"></i>
                            {project.location}
                        </p>
                        <p className="mb-0">
                            Starting from{" "}
                            <span className="price-tag fw-bold text-success">
                                ₹{project.price}
                            </span>
                        </p>
                    </div>
                </div>

                {/* 🔹 Image Carousel + Project Details */}
                <div className="row g-4 mb-4">
                    <div className="col-lg-6">
                        <Carousel fade interval={3000}>
                            {project.images.map((imgUrl, idx) => (
                                <Carousel.Item key={idx}>
                                    <img
                                        className="d-block w-100 project-carousel-img rounded"
                                        src={imgUrl}
                                        alt={`Slide ${idx + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>

                    <div className="col-lg-6 p-4 rounded shadow-sm bg-light">
                        <h5 className="mb-4 fw-bold text-decoration-underline gradient-text">
                            Project Details
                        </h5>

                        <DetailItem
                            icon={<FaMapMarkerAlt />}
                            label="Location"
                            value={project.location}
                            color="text-danger"
                        />
                        <DetailItem
                            icon={<FaBuilding />}
                            label="Builder"
                            value="Something"
                            color="text-secondary"
                        />
                        <DetailItem
                            icon={<FaBed />}
                            label="Bed Room"
                            value="3BHK"
                            color="text-success"
                        />
                        <DetailItem
                            icon={<FaRegClock />}
                            label="Status"
                            value={project.status?.toString()}
                            color="text-warning"
                        />
                        <DetailItem
                            icon={<FaRulerCombined />}
                            label="Unit Size"
                            value="2413 - 2517 Sq.Ft"
                            color="text-info"
                        />
                        <DetailItem
                            icon={<FaGlobe />}
                            label="Land Area"
                            value="1.4 Acr"
                            color="text-primary"
                        />
                        <DetailItem
                            icon={<FaRupeeSign />}
                            label="Price"
                            value={project.price}
                            color="text-success"
                        />

                        <Button
                            onClick={() => setShowContact(true)}
                            className="mt-3 px-4 fw-semibold shadow-sm border-0 contact-btn"
                        >
                            Contact
                        </Button>
                    </div>
                </div>

                {/* 🔹 Description */}
                <div className="project-description p-3">
                    <h2 className="mb-2 fw-bold text-decoration-underline gradient-text">
                        About the Project
                    </h2>
                    <p className="text-secondary text-justify">{project.description}</p>
                </div>

                {/* 🔹 Nearby Facilities */}
                <div className="nearby-facilities p-3">
                    <h2 className="mb-4 fw-bold text-decoration-underline gradient-text">
                        Nearby Facilities
                    </h2>
                    <div className="d-flex flex-wrap gap-3">
                        {project.nearby?.map((facility, idx) => (
                            <NearFecility
                                key={idx}
                                name={facility.name}
                                distance={facility.distance}
                                type={facility.type}
                            />
                        ))}
                    </div>
                </div>

                {/* 🔹 Amenities */}
                <div className="project-amenities p-3">
                    <h2 className="mb-4 fw-bold text-decoration-underline gradient-text">
                        Amenities
                    </h2>
                    <ul className="amenities-list list-unstyled">
                        {project.amenities?.map((amenity, idx) => (
                            <li key={idx} className="d-flex align-items-center mb-3">
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                <span className="fw-semibold text-secondary">{amenity}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 🔹 Contact Card */}
                {showContact && (
                    <div className="contact-card-section p-3">
                        <ContactCard
                            title={project.title}
                            location={project.location}
                            onClose={() => setShowContact(false)}
                        />
                    </div>
                )}
            </section>
        </>
    );
}
