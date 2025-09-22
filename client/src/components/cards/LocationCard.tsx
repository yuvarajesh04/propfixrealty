import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect, type KeyboardEvent } from "react";

interface LocationCardProp {
    location: string;
    index: number;
    projectCount?: number;
    isPopular?: boolean;
}

export default function LocationCard({ 
    location, 
    index, 
    projectCount = 0, 
    isPopular = false 
}: LocationCardProp) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Stagger animation based on index
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    const handleClick = useCallback(() => {
        // Add haptic feedback for mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        navigate(`/projects-in/${encodeURIComponent(location)}`);
    }, [navigate, location]);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsPressed(true);
            handleClick();
        }
        if (event.key === 'Escape') {
            event.currentTarget.blur();
        }
    }, [handleClick]);

    const formatLocationName = useCallback((name: string) => {
        return name.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }, []);

    const getLocationIcon = useCallback(() => {
        const lowerLocation = location.toLowerCase();
        if (lowerLocation.includes('beach') || lowerLocation.includes('coastal')) return 'bi-water';
        if (lowerLocation.includes('hill') || lowerLocation.includes('mountain')) return 'bi-mountain';
        if (lowerLocation.includes('city') || lowerLocation.includes('metro')) return 'bi-buildings';
        if (lowerLocation.includes('lake') || lowerLocation.includes('river')) return 'bi-droplet';
        return 'bi-geo-alt-fill';
    }, [location]);

    return (
        <div
            className="location-card rounded p-3"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onKeyUp={() => setIsPressed(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            aria-label={`View ${projectCount} projects in ${location}`}
            style={{
                cursor: 'pointer',
                boxShadow: isPressed 
                    ? '0 2px 8px rgba(0, 0, 0, 0.12)' 
                    : isHovered 
                        ? '0 8px 30px rgba(0, 0, 0, 0.16)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: `${isVisible ? 'translateY(0)' : 'translateY(20px)'} ${
                    isPressed 
                        ? 'translateY(2px) scale(0.96)' 
                        : isHovered 
                            ? 'translateY(-4px) scale(1.03)' 
                            : 'scale(1)'
                }`,
                opacity: isVisible ? 1 : 0,
                background: isHovered 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)' 
                    : '#ffffff',
                border: `2px solid ${isHovered ? '#4f79ac' : '#e1e8ed'}`,
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                ...(isPopular && {
                    background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)',
                    borderColor: '#ff6b6b'
                })
            }}
        >
            {/* Popular badge */}
            {isPopular && (
                <div
                    style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '12px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        padding: '4px 8px',
                        borderRadius: '0 0 8px 8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        zIndex: 2
                    }}
                >
                    ⭐ Popular
                </div>
            )}

            {/* Animated background gradient */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isPopular
                        ? 'linear-gradient(135deg, #ff6b6b, #ffa500)'
                        : 'linear-gradient(135deg, #4f79ac, #08aef5)',
                    opacity: isHovered ? 0.08 : 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                    borderRadius: 'inherit'
                }}
            />

            <div className="d-flex align-items-center position-relative">
                {/* Enhanced icon with dynamic selection */}
                <div
                    style={{
                        background: isPopular
                            ? 'linear-gradient(135deg, #ff6b6b, #ffa500)'
                            : 'linear-gradient(135deg, #4f79ac, #08aef5)',
                        color: 'white',
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: isHovered 
                            ? 'rotate(10deg) scale(1.1)' 
                            : 'rotate(0deg) scale(1)',
                        boxShadow: isHovered 
                            ? `0 8px 20px ${isPopular ? 'rgba(255, 107, 107, 0.4)' : 'rgba(79, 121, 172, 0.4)'}` 
                            : `0 4px 12px ${isPopular ? 'rgba(255, 107, 107, 0.2)' : 'rgba(79, 121, 172, 0.2)'}`,
                        position: 'relative'
                    }}
                >
                    <i 
                        className={getLocationIcon()}
                        style={{
                            fontSize: '20px',
                            transition: 'transform 0.3s ease',
                            transform: isPressed ? 'scale(0.85)' : 'scale(1)'
                        }}
                    />
                    
                    {/* Pulse effect */}
                    {isHovered && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 'inherit',
                                background: 'inherit',
                                animation: 'pulse 2s infinite',
                                opacity: 0.3,
                                zIndex: -1
                            }}
                        />
                    )}
                </div>

                {/* Enhanced content section */}
                <div style={{ marginLeft: '20px', flex: 1 }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h6
                            className="mb-1 fw-bold"
                            style={{
                                color: isHovered 
                                    ? (isPopular ? '#ff6b6b' : '#4f79ac') 
                                    : '#1a1a1a',
                                transition: 'all 0.3s ease',
                                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                                fontSize: '16px',
                                lineHeight: '1.3',
                                margin: 0
                            }}
                        >
                            {formatLocationName(location)}
                        </h6>
                        
                        {/* Animated chevron */}
                        <div
                            style={{
                                opacity: isHovered ? 1 : 0.4,
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                transform: isHovered ? 'translateX(4px) scale(1.2)' : 'translateX(0) scale(1)',
                                color: isPopular ? '#ff6b6b' : '#4f79ac'
                            }}
                        >
                            <i className="bi bi-arrow-right-short" style={{ fontSize: '18px', fontWeight: 'bold' }} />
                        </div>
                    </div>
                    
                    {/* Project count and call to action */}
                    <div className="d-flex align-items-center justify-content-between">
                        <small
                            style={{
                                color: '#6c757d',
                                fontSize: '13px',
                                opacity: isHovered ? 1 : 0.8,
                                transition: 'opacity 0.3s ease',
                                fontWeight: '500'
                            }}
                        >
                            {projectCount > 0 ? (
                                <>
                                    <i className="bi bi-building me-1" />
                                    {projectCount} project{projectCount !== 1 ? 's' : ''}
                                </>
                            ) : (
                                'Explore location'
                            )}
                        </small>
                        
                        <small
                            style={{
                                color: isPopular ? '#ff6b6b' : '#4f79ac',
                                fontSize: '12px',
                                opacity: isHovered ? 1 : 0,
                                transition: 'all 0.3s ease',
                                transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                                fontWeight: '600'
                            }}
                        >
                            View all →
                        </small>
                    </div>
                </div>
            </div>

            {/* Ripple click effect */}
            {isPressed && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '200%',
                        height: '200%',
                        background: `radial-gradient(circle, ${
                            isPopular ? '#ff6b6b' : '#4f79ac'
                        } 0%, transparent 70%)`,
                        opacity: 0.15,
                        transform: 'translate(-50%, -50%) scale(0)',
                        animation: 'ripple 0.8s ease-out',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                />
            )}
        </div>
    );
}

// Add these CSS animations to your global styles:
/*
@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.05); opacity: 0.1; }
}

@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
    }
}
*/
