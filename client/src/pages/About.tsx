import { Helmet } from "react-helmet-async";
import about_img from "../assets/about_img1.jpg";

const About = () => {
  return (
    <>
      {/* ✅ SEO Meta Tags */}
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

        {/* Open Graph (Facebook/LinkedIn) */}
        <meta property="og:title" content="About Propfix Realty | Trusted Real Estate Agency in Chennai" />
        <meta
          property="og:description"
          content="Discover Propfix Realty – Chennai’s top real estate agency for buying plots, villas, and apartments. Transparency, trust, and expertise for property buyers."
        />
        <meta property="og:image" content="https://propfixrealty.com/seo-about.jpg" />
        <meta property="og:url" content="https://propfixrealty.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Propfix Realty | Trusted Real Estate Agency in Chennai" />
        <meta
          name="twitter:description"
          content="Propfix Realty simplifies property buying in Chennai with verified listings, trust, and seamless experiences."
        />
        <meta name="twitter:image" content="https://propfixrealty.com/seo-about.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://propfixrealty.com/about" />
      </Helmet>

      {/* ✅ About Section */}
      <section className="about-us container-fluid py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Content Column */}
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              {/* Logo and Title */}
              <div className="text-center text-lg-start mb-4">
                <img
                  src="/profixrealtyicon.jpg"
                  alt="Propfix Realty Logo"
                  width={120}
                  height={120}
                  decoding="async"
                  loading="lazy"
                  className="img-fluid mb-3"
                />
                <h1
                  className="fw-bold mb-0"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    color: "#1a1a1a",
                    letterSpacing: "2px",
                  }}
                >
                  About Propfix Realty
                </h1>
              </div>

              {/* Subheading */}
              <div className="text-center text-lg-start mb-4">
                <h2
                  className="fw-semibold"
                  style={{
                    fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
                    color: "#2c3e50",
                    lineHeight: "1.3",
                  }}
                >
                  Chennai’s Leading Real Estate Agency
                </h2>
              </div>

              {/* About Content */}
              <div className="about-text" style={{ maxWidth: "100%" }}>
                <p
                  style={{
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    lineHeight: "1.7",
                    color: "#495057",
                    marginBottom: "1.5rem",
                    textAlign: "justify",
                  }}
                >
                  At Propfix Realty, we are transforming Chennai’s real estate market by
                  bringing together brokers, developers, and buyers under one trusted
                  platform. Our unique <strong>Syndicate</strong> and <strong>Radiate</strong> platforms consolidate all RERA-approved projects, offering a seamless and transparent property search.
                </p>
                <p
                  style={{
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    lineHeight: "1.7",
                    color: "#495057",
                    marginBottom: "0",
                    textAlign: "justify",
                  }}
                >
                  With a focus on trust and efficiency, we ensure that every buyer enjoys
                  peace of mind, secure transactions, and a smooth journey toward finding
                  their dream property in Chennai.
                </p>
              </div>

              {/* Call to Action (Desktop) */}
              <div className="text-center text-lg-start mt-4 d-none d-lg-block">
                <button
                  className="btn btn-outline-primary px-4 py-2"
                  style={{
                    borderColor: "#4f79ac",
                    color: "#4f79ac",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                  }}
                  aria-label="Learn more about Propfix Realty"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#4f79ac";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#4f79ac";
                  }}
                >
                  Learn More About Us
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="text-center">
                <div
                  className="about-image-container position-relative d-inline-block"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={about_img}
                    alt="Propfix Realty team working together in Chennai office"
                    title="About Propfix Realty"
                    className="img-fluid"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "auto",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  {/* Decorative overlay */}
                  <div
                    className="position-absolute"
                    style={{
                      top: "-10px",
                      right: "-10px",
                      width: "60px",
                      height: "60px",
                      background: "linear-gradient(135deg, #4f79ac, #08aef5)",
                      borderRadius: "50%",
                      opacity: "0.9",
                      zIndex: "-1",
                    }}
                  />
                  <div
                    className="position-absolute"
                    style={{
                      bottom: "-15px",
                      left: "-15px",
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, #08aef5, #4f79ac)",
                      borderRadius: "50%",
                      opacity: "0.7",
                      zIndex: "-1",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="row d-lg-none">
            <div className="col-12 text-center mt-4">
              <button
                className="btn btn-outline-primary px-4 py-2"
                style={{
                  borderColor: "#4f79ac",
                  color: "#4f79ac",
                  fontWeight: "600",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                }}
                aria-label="Learn more about Propfix Realty"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4f79ac";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#4f79ac";
                }}
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
