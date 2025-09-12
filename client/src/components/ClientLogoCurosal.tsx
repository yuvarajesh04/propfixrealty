import React from "react";
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Logo = { src: string; alt: string; id?: number };

interface Props {
  logos: Logo[];
}

const ClientLogoCarousel: React.FC<Props> = ({ logos }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      aria-label="Trusted partner logos"
      className="my-5 py-4 px-3"
      style={{ overflow: "hidden", backgroundColor: "#f9f9f9" }}
    >
      {/* Heading for SEO (semantic H2 inside homepage, but H3 inside inner pages) */}
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
                height: "80px",
                width: "100%",
                backgroundColor: ["C", "G", "H", "I", "J", "L"].includes(
                  logo.alt || ""
                )
                  ? "#000"
                  : "transparent",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="img-fluid"
                style={{
                  maxHeight: "50px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="visually-hidden">
                {logo.alt}
              </figcaption>
            </figure>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ClientLogoCarousel;
