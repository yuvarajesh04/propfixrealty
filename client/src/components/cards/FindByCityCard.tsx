import '../../styles/FindByCityCard.css';
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

interface FindByCityCardProp {
  city: string;
  description: string;
  price: string;
}

export default function FindByCityCard({ city, description, price }: FindByCityCardProp) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigate = useCallback(() => {
    navigate(`/projects-in/${city.toLowerCase()}`);
  }, [navigate, city]);

  const formatCityName = useCallback((name: string) => {
    return name.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }, []);

  return (
    <div
      className={`city-card position-relative ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate}
      style={{
        minHeight: '180px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#fff',
        boxShadow: isHovered 
          ? '0 10px 30px rgba(0,0,0,0.12)' 
          : '0 2px 6px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Top Gradient Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(135deg, #4f79ac, #08aef5)',
          opacity: isHovered ? 1 : 0.8,
          transition: 'opacity 0.3s ease'
        }}
      />

      <div className="card-body d-flex flex-column justify-content-between h-100 p-3">
        {/* City Name & Icon */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: '1.2',
            }}
          >
            {formatCityName(city)}
          </h5>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              background: isHovered ? 'linear-gradient(135deg, #4f79ac, #08aef5)' : '#f1f3f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <i
              className="bi bi-geo-alt-fill"
              style={{
                fontSize: '14px',
                color: isHovered ? '#fff' : '#6c757d',
                transition: 'color 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Price */}
        <div className="mb-2">
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              padding: '4px 10px',
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <i className="" style={{ fontSize: '12px' }} />
            {" " + price}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '0.85rem',
            color: '#495057',
            lineHeight: 1.4,
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {/* Explore Button */}
        <button
          type="button"
          className="w-100 border-0 text-white d-flex align-items-center justify-content-center"
          style={{
            background: isHovered ? 'linear-gradient(135deg, #3d6491, #0693d3)' : 'linear-gradient(135deg, #4f79ac, #08aef5)',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
          }}
        >
          Explore Details
          <i
            className="bi bi-arrow-right ms-2"
            style={{
              fontSize: '13px',
              transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          />
        </button>
      </div>

      {/* Hover Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(79,121,172,0.03), rgba(8,174,245,0.03))',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          borderRadius: '12px',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
