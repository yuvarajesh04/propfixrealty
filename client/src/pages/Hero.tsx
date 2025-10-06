import "../styles/Hero.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import backgroundImage from "../assets/test.jpg";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/show-all-projects?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/show-all-projects?search=${category.toLowerCase()}`);
  };

  return (
    <>
      <Helmet>
        <title>Buy Premium Plots in Chennai | Propfix Realty</title>
        <link rel="canonical" href="https://propfixrealty.com/" />
        <meta
          name="description"
          content="Discover premium plots for sale in Chennai with Propfix Realty. Verified listings, prime locations, and affordable prices for your dream home."
        />
        <meta
          name="keywords"
          content="plots in Chennai, buy plots Chennai, villas Chennai, apartments Chennai, Propfix Realty"
        />
        <link rel="preload" as="image" href={backgroundImage} />
      </Helmet>

      <section
        className="hero-section d-flex justify-content-center align-items-center text-white text-center"
        style={{
          background: `url(${backgroundImage}) center center / cover no-repeat`,
        }}
      >
        <div className="container">
          <h1 className="gradient-text heading-custom fw-bold mb-4">
            First Step to Your Dream Home
          </h1>

          <div className="search-container my-4 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSearch} className="w-100 d-flex justify-content-center">
              <div className="input-group mx-auto" style={{ maxWidth: "500px" }}>
                <input
                  type="text"
                  className="form-control px-3 py-2 search-box text-center"
                  placeholder="Search by location or plot name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search properties"
                />
                <button
                  type="submit"
                  className="input-group-text"
                  style={{
                    background: "linear-gradient(135deg, #4f79ac, #08aef5)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="hero-features mt-4 d-flex justify-content-center gap-3 flex-wrap">
            {["Plots", "Villas", "Apartments"].map((category) => (
              <button
                key={category}
                style={{ background: "linear-gradient(135deg, #4f79ac, #08aef5)" }}
                onClick={() => handleCategoryClick(category)}
                className="btn btn-light btn-sm px-4 py-2 fw-semibold rounded-pill shadow-sm text-white"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}