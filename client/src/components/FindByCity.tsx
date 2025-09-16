import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FindByCityCard from "./cards/FindByCityCard";
import "../styles/Projects.css";
import { useNavigate, useLocation } from "react-router-dom";
import projectApi from "../services/projectApi";

interface CityData {
  city: string;
  description: string;
  price: string;
}

export default function FindByCity() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLocationsPage = location.pathname === "/show-all-locations";

  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await projectApi.getProjects();

        if (projects && projects.length > 0) {
          // 🔹 Group projects by location and get price range
          const cityMap: Record<string, { min: number; max: number; description: string }> = {};

          projects.forEach((p: any) => {
            const city = p.location || "Unknown";
            const price = Number(p.price) || 0;

            if (!cityMap[city]) {
              cityMap[city] = {
                min: price,
                max: price,
                description: `Explore real estate projects in ${city}.`,
              };
            } else {
              cityMap[city].min = Math.min(cityMap[city].min, price);
              cityMap[city].max = Math.max(cityMap[city].max, price);
            }
          });

          const formattedCities: CityData[] = Object.entries(cityMap).map(
            ([city, data]) => ({
              city,
              description: data.description,
              price:
                data.min === data.max
                  ? `₹${data.min.toLocaleString()}`
                  : `₹${data.min.toLocaleString()} - ₹${data.max.toLocaleString()}`,
            })
          );

          setCities(formattedCities);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      {isLocationsPage && (
        <Helmet>
          <title>Find Properties by City in Chennai | Propfix Realty</title>
          <meta
            name="description"
            content="Browse plots, villas, and apartments across prime Chennai locations. Verified listings by Propfix Realty."
          />
          <meta
            name="keywords"
            content="properties in Chennai, real estate Chennai, flats in Sholinganallur, plots in Kelambakkam, villas in Pallavaram"
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
            content="Discover real estate opportunities across Chennai. Affordable plots, luxury villas, and modern apartments."
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
            content="Browse top Chennai locations for plots, villas, and apartments. Trusted by Propfix Realty."
          />
          <meta
            name="twitter:image"
            content="https://www.propfixrealty.com/seo-city.jpg"
          />
          {/* Structured Data JSON-LD */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": cities.map((city, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": city.city,
                "description": city.description,
              })),
            })}
          </script>
        </Helmet>
      )}

      <Container
        as="section"
        className="py-4 py-sm-5"
        role="region"
        aria-labelledby="city-section-heading"
      >
        <Row className="align-items-center justify-content-between mb-4">
          <Col xs={6}>
            <h2 id="city-section-heading" className="fs-3 fw-bold text-dark">
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

        {/* Loading State */}
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {cities.map((city, index) => (
              <Col key={index} lg={4} md={6} sm={12} className="mb-4">
                <FindByCityCard
                  city={city.city}
                  description={city.description}
                  price={city.price}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
