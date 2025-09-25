import { Helmet } from "react-helmet-async";
import about_img from "../assets/about_img1.jpg";
import propfixrealty from "../assets/profixrealtyicon.png"

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Propfix Realty | Trusted Real Estate Agency in Chennai</title>
        <meta
          name="description"
          content="Propfix Realty is Chennai’s trusted real estate agency, offering verified plots, villas, and apartments. Learn about our mission to simplify property buying with trust and expertise."
        />
        <meta
          name="keywords"
          content="Propfix Realty, real estate Chennai, buy property Chennai, trusted real estate agency, Chennai plots, Chennai villas, Chennai apartments"
        />
        <meta name="author" content="Propfix Realty" />
        <link rel="canonical" href="https://propfixrealty.com/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Propfix Realty | Trusted Real Estate Agency in Chennai" />
        <meta
          property="og:description"
          content="Discover Propfix Realty – Chennai’s top real estate agency for buying plots, villas, and apartments. Transparency, trust, and expertise for property buyers."
        />
        <meta property="og:image" content="https://propfixrealty.com/seo-about.jpg" />
        <meta property="og:url" content="https://propfixrealty.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Propfix Realty | Trusted Real Estate Agency in Chennai" />
        <meta
          name="twitter:description"
          content="Propfix Realty simplifies property buying in Chennai with verified listings, trust, and seamless experiences."
        />
        <meta name="twitter:image" content="https://propfixrealty.com/seo-about.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Propfix Realty",
            "url": "https://propfixrealty.com",
            "logo": "https://propfixrealty.com/profixrealtyicon.jpg",
            "sameAs": [
              "https://www.facebook.com/propfixrealty",
              "https://www.instagram.com/propfixrealty",
              "https://www.linkedin.com/company/propfixrealty"
            ],
            "description": "Propfix Realty is Chennai’s trusted real estate agency offering verified plots, villas, and apartments."
          })}
        </script>
      </Helmet>

      <section
        className="about-us container-fluid py-5"
        role="region"
        aria-labelledby="about-section-heading"
      >
        <div className="container">
          <h1 id="about-section-heading" className="d-none">About Propfix Realty</h1>

          <div className="row align-items-center g-4">
            {/* Content Column */}
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              <div className="text-center text-lg-start mb-4">
                <img
                  src={propfixrealty}
                  alt="Propfix Realty Logo"
                  width={120}
                  height={120}
                  decoding="async"
                  loading="lazy"
                  className="img-fluid mb-3"
                />
                <h1 className="fw-bold mb-0" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#1a1a1a", letterSpacing: "2px" }}>
                  About Propfix Realty
                </h1>
                <h2 className="fw-semibold" style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)", color: "#2c3e50", lineHeight: "1.3" }}>
                  Chennai’s Leading Real Estate Agency
                </h2>
              </div>

              <div className="about-text" style={{ maxWidth: "100%" }}>
                <p style={{ fontSize: "clamp(14px, 2.5vw, 16px)", lineHeight: "1.7", color: "#495057", marginBottom: "1.5rem", textAlign: "justify" }}>
                  At Propfix Realty, we are transforming Chennai’s real estate market by bringing together brokers, developers, and buyers under one trusted platform. Our unique <strong>Syndicate</strong> and <strong>Radiate</strong> platforms consolidate all RERA-approved projects, offering a seamless and transparent property search.
                </p>
                <p style={{ fontSize: "clamp(14px, 2.5vw, 16px)", lineHeight: "1.7", color: "#495057", marginBottom: "0", textAlign: "justify" }}>
                  With a focus on trust and efficiency, we ensure that every buyer enjoys peace of mind, secure transactions, and a smooth journey toward finding their dream property in Chennai.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center text-lg-start mt-4">
                <button
                  className="btn btn-outline-primary px-4 py-2"
                  style={{ borderColor: "#4f79ac", color: "#4f79ac", fontWeight: "600", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", transition: "all 0.3s ease" }}
                  aria-label="Learn more about Propfix Realty"
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#4f79ac"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4f79ac"; }}
                >
                  Learn More About Us
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="text-center">
                <div className="about-image-container position-relative d-inline-block" style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)" }}>
                  <img
                    src={about_img}
                    alt="Propfix Realty team working together in Chennai office"
                    title="About Propfix Realty"
                    className="img-fluid"
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", maxWidth: "400px", height: "auto", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
