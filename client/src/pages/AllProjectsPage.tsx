import React, { useEffect, useState } from "react";
import ProjectCard from "../components/cards/ProjectCard";
import { allProjects } from "../data/ProjectData";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AllProjectsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(allProjects);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on category and search
  useEffect(() => {
    const category = searchParams.get("category")?.toLowerCase();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    let filteredProjects = allProjects;

    if (category) {
      filteredProjects = filteredProjects.filter(
        (p) => p.category.toLowerCase() === category
      );
    }

    if (searchQuery) {
      setSearchTerm(searchQuery);
      filteredProjects = filteredProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.location.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery) ||
          p.description.toLowerCase().includes(searchQuery)
      );
    }

    setProjects(filteredProjects);
  }, [searchParams]);

  // Update URL with search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const newSearchParams = new URLSearchParams(searchParams);
    if (term) {
      newSearchParams.set("search", term);
    } else {
      newSearchParams.delete("search");
    }

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  // Dynamic SEO metadata
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const pageTitle = category
    ? `Projects in ${category} | Propfix Realty`
    : searchQuery
    ? `Search results for "${searchQuery}" | Propfix Realty`
    : "All Projects in Chennai | Propfix Realty";

  const pageDescription = category
    ? `Explore real estate projects in ${category}, Chennai. Find verified properties and detailed project information at Propfix Realty.`
    : searchQuery
    ? `Find projects matching "${searchQuery}" in Chennai. Explore verified listings, prices, and detailed information with Propfix Realty.`
    : "Browse all real estate projects in Chennai. Affordable, luxury, and verified listings available at Propfix Realty.";

  return (
    <div className="py-5 bg-light">
      {/* SEO */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://propfixrealty.com${window.location.pathname}${window.location.search}`}
        />
        <meta
          property="og:image"
          content={projects[0]?.image || "https://propfixrealty.com/default.jpg"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container">
        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleChange}
              className="form-control shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="row g-4 justify-content-center">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={index}
                className="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch"
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h3 className="text-muted">No projects found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProjectsPage;
