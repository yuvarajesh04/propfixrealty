// src/components/CounterSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import businessMan from '../assets/icons/businessman.jpg'
import house from '../assets/icons/house.jpg'
import sold from '../assets/icons/sold.jpg'
import location from '../assets/icons/location.svg'

interface CounterItem {
    icon: string;
    count: number;
    label: string;
}

const counterData: CounterItem[] = [
    {
        icon: house,
        count: 500,
        label: 'Properties Listed',
    },
    {
        icon: location,
        count: 100,
        label: 'Locations Covers',
    },
    {
        icon: businessMan,
        count: 10,
        label: 'Expert Agents',
    },
    {
        icon: sold,
        count: 150,
        label: 'Properties Sold',
    },
];

const CounterSection: React.FC = () => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const [counts, setCounts] = useState(counterData.map(() => 0));
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!counterRef.current || hasAnimated) return;

            const top = counterRef.current.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (top < windowHeight) {
                animateCounts();
                setHasAnimated(true);
            }
        };

        const animateCounts = () => {
            counterData.forEach((item, index) => {
                let start = 0;
                const end = item.count;
                const duration = 2000;
                const increment = end / (duration / 16);

                const animate = () => {
                    start += increment;
                    if (start < end) {
                        setCounts((prev) => {
                            const updated = [...prev];
                            updated[index] = Math.floor(start);
                            return updated;
                        });
                        requestAnimationFrame(animate);
                    } else {
                        setCounts((prev) => {
                            const updated = [...prev];
                            updated[index] = end;
                            return updated;
                        });
                    }
                };

                animate();
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasAnimated]);

    return (
        <div className="counter py-3" ref={counterRef} style={{backgroundColor: 'var(--primary-color)'}}>
            <div className="container">
                <div className="row text-center">
                    {counterData.map((item, index) => (
                        <div key={index} className="col-lg-3 col-6 mb-4">
                            <img
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    margin: '0 auto',
                                }}
                                src={item.icon}
                            />
                                
                            <div className="counter-value fs-3 fw-bold">
                                {counts[index]}<span className="plus">+</span>
                            </div>
                            <h5 className="mt-2 fw-semibold">{item.label}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CounterSection;
