import { useState, useEffect } from "react";
import ProjectCard from "../components/cards/ProjectCard";
import back from "../assets/stuff/back.jpg";
import next from "../assets/stuff/right.jpg";
import { useNavigate } from "react-router-dom";
import "../styles/Projects.css";
import projectApi from "../services/projectApi";

export default function Projects() {
  const [startIndex, setStartIndex] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [allProjects, setAllProjects] = useState<any[]>([]); // ✅ FIX
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
        setAllProjects(res || []); // ✅ FIX: store in state
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
  const projectsToShow = allProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const handleShowAllProjects = () => {
    navigate("/show-all-projects");
  };

  // ✅ Prev: move back by 1 card with animation
  const handlePrev = () => {
    if (isTransitioning || allProjects.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setStartIndex((prev) =>
        prev - 1 < 0 ? allProjects.length - projectsPerPage : prev - 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  // ✅ Next: move forward by 1 card with animation
  const handleNext = () => {
    if (isTransitioning || allProjects.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setStartIndex((prev) =>
        prev + 1 > allProjects.length - projectsPerPage ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section className="m-lg-4">
      <div className="project-container">
        <div className="project-header">
          {/* Header with button */}
          <div className="heading d-flex justify-content-around align-items-center">
            <h2 className="fw-bold">Our Projects</h2>
            <button
              onClick={handleShowAllProjects}
              className="btn btn-outline-primary"
              style={{
                background: "linear-gradient(135deg, #4f79ac, #08aef5)",
                color: "white",
                border: "none",
              }}
            >
              View all projects
            </button>
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
                className={`row project-cards-row ${
                  isTransitioning ? "transitioning" : ""
                }`}
              >
                {projectsToShow.map((project, index) => (
                  <div
                    className={`col-12 ${
                      projectsPerPage === 3 ? "col-lg-4" : ""
                    } project-card-col`}
                    key={`${startIndex}-${index}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
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
