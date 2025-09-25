import { useState, useEffect } from "react";
import ProjectCard from "../components/cards/ProjectCard";
import back from "../assets/stuff/back.jpg";
import next from "../assets/stuff/right.jpg";
import { useNavigate } from "react-router-dom";
import "../styles/Projects.css";
import projectApi from "../services/projectApi";
import propfixrealty from "../assets/profixrealtyicon.png";

export default function Projects() {
  const [startIndex, setStartIndex] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [activeType, setActiveType] = useState("All"); // ✅ track active filter
  const navigate = useNavigate();

  // ✅ Handle responsive projects per page & fetch projects
  useEffect(() => {
    const updateProjectsPerPage = () => {
      if (window.innerWidth < 992) {
        setProjectsPerPage(1); // Small screens → 1 card
      } else {
        setProjectsPerPage(3); // Large screens → 3 cards
      }
    };

    const getProjects = async () => {
      try {
        const res = await projectApi.getProjects();
        setAllProjects(res || []);
        setFilteredProjects(res || []); // ✅ keep full list for filtering
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    updateProjectsPerPage();
    getProjects();

    window.addEventListener("resize", updateProjectsPerPage);
    return () => {
      window.removeEventListener("resize", updateProjectsPerPage);
    };
  }, []);

  // ✅ Guard: prevent slice errors when no projects
  const projectsToShow = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const handleShowAllProjects = () => {
    navigate("/show-all-projects");
  };

  function handleFilterProjects(type: string) {
    setActiveType(type); // ✅ set active filter

    if (type === "View All") {
      handleShowAllProjects()
    } else {
      const projects = allProjects.filter(
        (proj) => proj.type?.toLowerCase() === type.toLowerCase()
      );
      setFilteredProjects(projects);
    }

    setStartIndex(0); // ✅ reset carousel position
  }

  const types = [
    { name: "Plot" },
    { name: "Apartment" },
    { name: "Villa" },
    { name: "View All" },
  ];

  // ✅ Prev: move back by 1 card with animation
  const handlePrev = () => {
    if (isTransitioning || filteredProjects.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setStartIndex((prev) =>
        prev - 1 < 0 ? filteredProjects.length - projectsPerPage : prev - 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  // ✅ Next: move forward by 1 card with animation
  const handleNext = () => {
    if (isTransitioning || filteredProjects.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setStartIndex((prev) =>
        prev + 1 > filteredProjects.length - projectsPerPage ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section className="m-lg-4">
      <div className="project-container">
        <div className="project-header">
          {/* Header with button */}
          <div className="project-logo-with-button d-flex justify-content-center flex-column align-items-center">
            <div className="image-container">
              <img
                src={propfixrealty}
                alt="Propfix Realty Logo"
                width={120}
                height={120}
                decoding="async"
                loading="lazy"
                className="img-fluid mb-3"
              />
            </div>
            <h1 className="fs-2">Current Projects</h1>

            {/* Filter buttons */}
            <div className="project-btns d-flex flex-wrap justify-content-center justify-content-lg-end gap-2">
              {types.map((type, index) => (
                <button
                  key={index}
                  className={`
                    px-3 px-sm-3 px-md-4 px-lg-4 
                    py-2 py-sm-2 py-md-2 py-lg-2
                    mx-1 my-2 
                    rounded-pill fw-semibold
                  `}
                  onClick={() => handleFilterProjects(type.name)}
                  style={{
                    background:
                      activeType === type.name
                        ? "linear-gradient(135deg, #4f79ac, #08aef5)" // active
                        : "white",
                    color:
                      activeType === type.name
                        ? "white"
                        : "rgba(59, 121, 192, 1)",
                    border: "2px solid rgb(37, 170, 225)",
                  }}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects with navigation */}
          <div className="project-body">
            {/* Prev Button */}
            <div className="previous-btn">
              <button
                className="btn"
                onClick={handlePrev}
                disabled={isTransitioning}
              >
                <img src={back} alt="Back" />
              </button>
            </div>

            {/* Project Cards Container */}
            <div className="project-cards-container">
              <div
                className={`row project-cards-row ${isTransitioning ? "transitioning" : ""
                  }`}
              >
                {projectsToShow.length > 0 ? (
                  projectsToShow.map((project, index) => (
                    <div
                      className={`col-12 ${projectsPerPage === 3 ? "col-lg-4" : ""
                        } project-card-col`}
                      key={`${startIndex}-${index}`}
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h4>No projects found</h4>
                  </div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <div className="next-btn">
              <button
                className="btn"
                onClick={handleNext}
                disabled={isTransitioning}
              >
                <img src={next} alt="Next" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
