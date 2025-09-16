import "../styles/Hero.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle search form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to filtered projects page
      navigate(`/all-projects?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle category button click
  const handleCategoryClick = (category: string) => {
    navigate(`/all-projects?category=${category.toLowerCase()}`);
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
      </Helmet>

      <section className="hero-section d-flex justify-content-center align-items-center text-white text-center">
        <div className="container">
          <h1 className="gradient-text heading-custom fw-bold mb-4">
            First Step to Your Dream Home
          </h1>

          {/* Search Form */}
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

          {/* Category Buttons */}
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
