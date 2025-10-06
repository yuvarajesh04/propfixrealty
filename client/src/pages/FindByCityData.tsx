import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/cards/ProjectCard";
import profixrealtyLogo from "../assets/profixrealtyicon.png";
import { Helmet } from "react-helmet";
import "../styles/Projects.css";
import projectApi from "../services/projectApi";

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

interface FindByCityDataProps {
  city?: string;
}

const FindByCityData: React.FC<FindByCityDataProps> = ({ city }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Plots" | "Villas" | "Apartments"
  >("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call your backend API
        const res = await projectApi.getProjects();
        const data: Project[] = await res;
        setProjects(data);
      } catch (err: any) {
      setError(err.message || "Error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

// Filter by city and category
const filteredProjects = projects.filter((p) => {
  const matchCity = city
    ? p.location?.toLowerCase().includes(city.toLowerCase())
    : true;

  let matchCategory = true;
  if (selectedCategory !== "All") {
    const normalizedType =
      p.type === "villa"
        ? "Villas"
        : p.type === "apartment"
          ? "Apartments"
          : "Plots";
    matchCategory = normalizedType === selectedCategory;
  }

  return matchCity && matchCategory;
});

// Dynamic SEO values
const pageTitle = `Projects${city ? ` in ${city}` : ""} | Propfix Realty`;
const pageDescription = `Discover premium ${selectedCategory !== "All" ? selectedCategory.toLowerCase() : "real estate"
  } projects${city ? ` in ${city}` : ""} with Propfix Realty. Explore verified listings, prime locations, and affordable prices.`;

return (
  <div className="container pb-5">
    {/* SEO Helmet */}
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://propfixrealty.com/${city ? `projects/${city.toLowerCase()}` : "projects"
          }`}
      />
      <meta
        property="og:image"
        content="https://propfixrealty.com/og-image.jpg"
      />
    </Helmet>

    {/* Header */}
    <div className="text-center mb-4">
      <img
        src={profixrealtyLogo}
        alt="Propfix Realty Icon"
        width={120}
        height={120}
        decoding="async"
        className="img-fluid"
      />
    </div>

    {/* Filter Buttons */}
    <div className="d-flex justify-content-center mb-4">
      {["All", "Plots", "Villas", "Apartments"].map((cat) => (
        <button
          key={cat}
          className="btn mx-2"
          style={{
            backgroundColor: selectedCategory === cat ? "#25aae1" : "transparent",
            color: selectedCategory === cat ? "#fff" : "#0A1F44",
            border: `2px solid #25aae1`,
          }}
          onClick={() => setSelectedCategory(cat as any)}
        >
          {cat}
        </button>
      ))}
    </div>
    <h1 className="text-center fs-4">Our Projects {city && `in ${city}`}</h1>

    {/* Loader / Error / Projects Grid */}
    {loading ? (
      <p className="text-center">Loading projects...</p>
    ) : error ? (
      <p className="text-center text-danger">{error}</p>
    ) : (
      <div className="row g-4">
        {filteredProjects.map((project) => (
          <div key={project._id} className="col-md-6 col-sm-12 col-lg-4">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    )}

    {/* Show All Button */}
    {filteredProjects.length > 6 && (
      <div className="text-center mt-4 d-flex justify-content-center align-items-center">
        <button
          className="btn show-more-btn btn-primary fw-semibold border-0 p-x-3 p-y-2"
          onClick={() => navigate("/projects")}
          style={{ backgroundColor: "#25aae1" }}
        >
          Show All Projects
          <i className="p-2 bi bi-arrow-right"></i>
        </button>
      </div>
    )}
  </div>
);
};

export default FindByCityData;
