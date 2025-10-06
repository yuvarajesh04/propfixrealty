import React, { useState, useEffect } from "react";
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Logo = { src: string; alt: string; id?: number; bg?: string };

interface Props {
  logos: Logo[];
}

const ClientLogoCarousel: React.FC<Props> = ({ logos }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // Render a placeholder during SSR
  if (!isClient) {
    return (
      <section
        aria-label="Trusted partner logos"
        className="my-5 py-4 px-3"
        style={{ overflow: "hidden", backgroundColor: "#f9f9f9" }}
      >
        <h2 className="text-center mb-4 fw-bold">Our Trusted Partners</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {logos.slice(0, 5).map((logo) => (
            <figure
              key={logo.id || logo.alt}
              className="m-0 d-flex justify-content-center align-items-center"
              style={{
                height: "100px",
                width: "180px",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "var(--shadow-sm)",
                backgroundColor: logo.bg ? 'black': '#ffff',
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="img-fluid"
                style={{
                  maxHeight: "60px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="visually-hidden">{logo.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Trusted partner logos"
      className="my-5 py-4 px-3"
      style={{ overflow: "hidden", backgroundColor: "#f9f9f9" }}
    >
      <h2 className="text-center mb-4 fw-bold">Our Trusted Partners</h2>

      <Slider {...settings}>
        {logos.map((logo) => (
          <div
            key={logo.id || logo.alt}
            className="d-flex justify-content-center align-items-center px-2"
          >
            <figure
              className="m-0 d-flex justify-content-center align-items-center"
              style={{
                height: "100px",
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "var(--shadow-sm)",
                backgroundColor: logo.bg ? 'black': '#ffff',
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="img-fluid"
                style={{
                  maxHeight: "60px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="visually-hidden">{logo.alt}</figcaption>
            </figure>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ClientLogoCarousel;