import React, { useEffect, useState } from "react";
import ProjectCard from "../components/cards/ProjectCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import projectApi from "../services/projectApi";

const AllProjectsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all projects on mount
  useEffect(() => {
    window.scroll(0, 0);
    const getProjects = async () => {
      try {
        const res = await projectApi.getProjects();
        setAllProjects(res || []);
        setProjects(res || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    getProjects();
  }, []);

  // Apply filters when searchParams or allProjects changes
  useEffect(() => {
    const category = searchParams.get("category")?.toLowerCase();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    let filteredProjects = [...allProjects];

    if (category) {
      filteredProjects = filteredProjects.filter(
        (p) => p.type?.toLowerCase() === category
      );
    }

    if (searchQuery) {
      setSearchTerm(searchQuery);
      filteredProjects = filteredProjects.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchQuery) ||
          p.location?.toLowerCase().includes(searchQuery) ||
          p.type?.toLowerCase().includes(searchQuery) ||
          p.des?.toLowerCase().includes(searchQuery)
      );
    }

    setProjects(filteredProjects);
  }, [searchParams, allProjects]);

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

  return (
    <div className="py-5 bg-light">
      <Helmet>
        <title>All Projects | Propfix Realty</title>
        <meta name="description" content="Browse all real estate projects in Chennai." />
      </Helmet>

      <div className="container">
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
