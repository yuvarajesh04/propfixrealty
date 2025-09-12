import React from 'react';

interface FecilityProps {
    distance: string;
    type: string;
    image: string;
    name: string
}

const Capitalize = (value: string): string => {
    if (!value) return "";
    const firstLetter = value[0].toUpperCase();
    const rest = value.slice(1);
    return firstLetter + rest;
};

const capitalizeWords = (name: string): string => {
    return name
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const NearFecility: React.FC<FecilityProps> = ({ distance, type, image, name }) => (
    <div className="bg-white d-flex flex-column gap-2 p-2 rounded border border-small" style={{ width: "100%", height: '150px' }}>
        <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
            <img
                src={image}
                alt={type}
                className="img-fluid"
                style={{ objectFit: "contain", maxHeight: "100%" }}
            />
        </div>
        <span className="text-muted small">{Capitalize(type)} – {distance}</span>
        <p style={{fontSize: '14px'}}>{capitalizeWords(name)}</p>
    </div>
);


export default NearFecility;
