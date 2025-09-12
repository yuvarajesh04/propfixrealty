import "../styles/Hero.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/show-all-projects?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Helmet>
        {/* SEO Essentials */}
        <title>
          Buy Premium Plots in Chennai | Affordable Land for Sale | Propfix Realty
        </title>
        <link rel="canonical" href="https://propfixrealty.com/" />
        <meta
          name="description"
          content="Discover premium plots for sale in Chennai with Propfix Realty. Verified listings, prime locations, and affordable prices to build your dream home."
        />
        <meta
          name="keywords"
          content="plots for sale in Chennai, land in Chennai, real estate Chennai, buy plots Chennai, Propfix Realty"
        />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="Buy Premium Plots in Chennai | Affordable Land for Sale | Propfix Realty"
        />
        <meta
          property="og:description"
          content="Discover premium plots for sale in Chennai with Propfix Realty. Verified listings, prime locations, and affordable prices to build your dream home."
        />
        <meta property="og:url" content="https://propfixrealty.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://propfixrealty.com/seo-banner.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Buy Premium Plots in Chennai | Affordable Land for Sale | Propfix Realty"
        />
        <meta
          name="twitter:description"
          content="Discover premium plots for sale in Chennai with Propfix Realty. Verified listings, prime locations, and affordable prices to build your dream home."
        />
        <meta
          name="twitter:image"
          content="https://propfixrealty.com/seo-banner.jpg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Propfix Realty",
            "url": "https://propfixrealty.com/",
            "logo": "https://propfixrealty.com/logo.jpg",
            "sameAs": [
              "https://www.facebook.com/propfixrealty",
              "https://www.instagram.com/propfixrealty",
              "https://www.linkedin.com/company/propfixrealty"
            ],
            "description":
              "Premium plots for sale in Chennai. Affordable prices, verified listings, and prime locations with Propfix Realty."
          })}
        </script>
      </Helmet>

      <section className="hero-section d-flex justify-content-center align-items-center text-white text-center">
        <div className="container">
          <h1
            className="gradient-text heading-custom fw-bold mb-4"
            data-aos="zoom-in"
          >
            First step for your dream home
          </h1>

          {/* Search Bar */}
          <div className="search-container my-4 d-flex justify-content-center align-items-center">
            <form
              onSubmit={handleSearch}
              className="w-100 d-flex justify-content-center"
            >
              <div
                className="input-group mx-auto"
                style={{ maxWidth: "500px" }}
              >
                <input
                  type="text"
                  className="form-control px-3 py-2 border-0 serch-box text-center"
                  style={{
                    fontSize: "16px",
                    borderRadius: "30px 0 0 30px",
                    textAlign: "center",
                  }}
                  placeholder="Search by location or plot name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search properties"
                />
                <button
                  type="submit"
                  className="input-group-text border-0 px-4"
                  style={{
                    background: "linear-gradient(135deg, #4f79ac, #08aef5)",
                    color: "white",
                    borderRadius: "0 30px 30px 0",
                    cursor: "pointer",
                  }}
                  aria-label="Search"
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
                style={{
                  background: "linear-gradient(135deg, #4f79ac, #08aef5)",
                }}
                onClick={() => {
                  navigate(
                    `/show-all-projects?category=${category.toLowerCase()}&filterApplied=true`
                  );
                }}
                className="btn btn-light btn-sm px-4 py-2 fw-semibold rounded-pill shadow-sm text-white"
                aria-label={`View ${category} projects`}
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
