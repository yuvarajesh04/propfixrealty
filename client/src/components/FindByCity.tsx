import { Container, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FindByCityCard from "./cards/FindByCityCard";
import "../styles/Projects.css";
import { useNavigate, useLocation } from "react-router-dom";

const cities = [
  {
    city: "Sholinganallur",
    description:
      "Explore premium residential and commercial properties in Chennai's IT corridor.",
    price: "₹3.60 Cr - ₹4.05 Cr",
  },
  {
    city: "Kelambakkam",
    description:
      "Affordable homes and investment-friendly real estate near Chennai IT hub.",
    price: "₹27 L - ₹90 L",
  },
  {
    city: "Pallavaram",
    description:
      "Budget-friendly apartments and luxury villas in a prime Chennai location.",
    price: "₹34 L - ₹90 L",
  },
];

export default function FindByCity() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLocationsPage = location.pathname === "/show-all-locations";

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      {isLocationsPage && (
        <Helmet>
          <title>Find Properties by City in Chennai | Propfix Realty</title>
          <meta
            name="description"
            content="Browse plots, villas, and apartments across prime Chennai locations like Sholinganallur, Kelambakkam, and Pallavaram. Verified listings by Propfix Realty."
          />
          <meta
            name="keywords"
            content="properties in Chennai, real estate Chennai, Sholinganallur flats, Kelambakkam plots, Pallavaram villas, buy property Chennai"
          />
          <link
            rel="canonical"
            href="https://www.propfixrealty.com/show-all-locations"
          />

          {/* Open Graph */}
          <meta
            property="og:title"
            content="Find Properties by City in Chennai | Propfix Realty"
          />
          <meta
            property="og:description"
            content="Discover real estate opportunities across Chennai. Affordable plots, luxury villas, and modern apartments in Sholinganallur, Kelambakkam, and Pallavaram."
          />
          <meta
            property="og:url"
            content="https://www.propfixrealty.com/show-all-locations"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://www.propfixrealty.com/seo-city.jpg"
          />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Find Properties by City in Chennai | Propfix Realty"
          />
          <meta
            name="twitter:description"
            content="Browse top Chennai locations like Sholinganallur, Kelambakkam, and Pallavaram for plots, villas, and apartments. Trusted by Propfix Realty."
          />
          <meta
            name="twitter:image"
            content="https://www.propfixrealty.com/seo-city.jpg"
          />
        </Helmet>
      )}

      <Container as="section" className="py-4 py-sm-5">
        {/* Section Header */}
        <Row className="align-items-center justify-content-between mb-4">
          <Col xs={6}>
            <h2 className="fs-3 fw-bold text-dark">
              Find Properties by City in Chennai
            </h2>
          </Col>
          <Col xs={6} className="text-end">
            <Button
              onClick={() => navigate("/show-all-locations")}
              className="border-0 px-4 py-2 fw-semibold show-all-btn"
              style={{
                background: "linear-gradient(135deg, #4f79ac, #08aef5)",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
              aria-label="Show all property locations in Chennai"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #08aef5, #4f79ac)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #4f79ac, #08aef5)")
              }
            >
              Show all
            </Button>
          </Col>
        </Row>

        {/* City Cards */}
        <Row>
          {cities.map((city, index) => (
            <Col key={index} lg={4} md={6} sm={12} className="mb-4">
              <FindByCityCard
                city={city.city}
                description="Good place to live"
                price={city.price}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
