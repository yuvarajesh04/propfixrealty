import React, { useEffect, useState } from "react";
import ProjectCard from "../components/cards/ProjectCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import projectApi from "../services/projectApi";

const AllProjectsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all projects once
  useEffect(() => {
    window.scroll(0, 0);
    const getProjects = async () => {
      try {
        const res = await projectApi.getProjects();
        setAllProjects(res || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    getProjects();
  }, []);

  // Sync searchTerm with searchParams on mount / URL change
  useEffect(() => {
    const category = searchParams.get("type")?.toLowerCase() || "";
    const search = searchParams.get("search") || "";
    setSearchTerm(search);

    let projects = [...allProjects];

    if (category) {
      projects = projects.filter((p) => p.type?.toLowerCase() === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchLower) ||
          p.location?.toLowerCase().includes(searchLower) ||
          p.type?.toLowerCase().includes(searchLower) ||
          p.des?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProjects(projects);
  }, [searchParams, allProjects]);

  // Handle input change and update URL
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className="py-5 bg-light">
      <Helmet>
        <title>All Projects | Propfix Realty</title>
        <meta name="description" content="Browse all real estate projects in Chennai." />
      </Helmet>

      <div className="container">
        {/* Search Input */}
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
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
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
