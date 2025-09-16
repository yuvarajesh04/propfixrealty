import { Helmet } from "react-helmet";
import Hero from "./Hero";
import ProjectsPage from "./Projects";
import FindByCity from "../components/FindByCity";
import About from "./About";
import Contact from "./Contact";
import CounterSection from "./Details";
import ClientLogoCarousel from "../components/ClientLogoCurosal";

// Image imports
import urbanrise from '../assets/clientlogos/urbanrise.webp';
import lifestyle from '../assets/clientlogos/lifestyle-housing.jpg';
import jainhousing from '../assets/clientlogos/jain-housing.webp';
import nutech from '../assets/clientlogos/nu-tech.jpg';
import sriramproperties from '../assets/clientlogos/sriramproperties.jpg';
import atroidlogo from '../assets/clientlogos/adroit-logo-dark.svg';
import dra from '../assets/clientlogos/dra.svg';
import lml from '../assets/clientlogos/lml-homes.jpg';
import brigade from '../assets/clientlogos/brigade.jpg';
import raidance from '../assets/clientlogos/raidance.svg';
import mp from '../assets/clientlogos/mp.jpg';
import sidarthhomes from '../assets/clientlogos/sidarthhomes.jpg';
import urbantree from '../assets/clientlogos/urbantree.jpg';

// Logos array
export const logos = [
    { src: urbantree, alt: "Urbantree Projects Logo", id: 12 },
    { src: urbanrise, alt: "Urbanrise Projects Logo", id: 1 },
    { src: lifestyle, alt: "Lifestyle Housing Projects Logo", id: 2 },
    { src: jainhousing, alt: "Jain Housing Projects Logo", id: 3, bg:"dark" },
    { src: nutech, alt: "Nu Tech Projects Logo", id: 4 },
    { src: sriramproperties, alt: "Sriram Properties Logo", id: 5 },
    { src: atroidlogo, alt: "Adroit Logo", id: 6 },
    { src: dra, alt: "DRA Logo", id: 7, bg: "dark" },
    { src: lml, alt: "LML Homes Logo", id: 8, bg: "dark" },
    { src: brigade, alt: "Brigade Logo", id: 9, bg: "dark" },
    { src: raidance, alt: "Raidance Logo", id: 10, bg:"dark" },
    { src: mp, alt: "MP Projects Logo", id: 11 },
    { src: sidarthhomes, alt: "Sidarth Homes Logo", id: 13, bg: "dark" },
];

export default function Home() {
    return (
        <div className="home-page">
            {/* SEO Meta Tags */}
            <Helmet>
                <title>PropFix Realty | Best Real Estate Properties in Chennai & Madurai</title>
                <meta name="description" content="PropFix Realty offers premium residential and commercial properties in Chennai, Madurai, and nearby areas. Explore top real estate projects and connect with trusted developers." />
                <meta name="keywords" content="real estate Chennai, properties in Chennai, plots in Madurai, real estate Madurai, residential projects, commercial projects" />
                
                {/* Structured Data JSON-LD */}
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "RealEstateAgent",
                        "name": "PropFix Realty",
                        "url": "https://propfixrealty.com",
                        "logo": "https://propfixrealty.com/assets/your-logo.png",
                        "sameAs": [
                            "https://www.facebook.com/propfixrealty",
                            "https://www.instagram.com/propfixrealty"
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Your Street Address",
                            "addressLocality": "Chennai",
                            "addressRegion": "TN",
                            "postalCode": "600xxx",
                            "addressCountry": "IN"
                        },
                        "telephone": "+91-XXXXXXXXXX"
                    }
                    `}
                </script>
            </Helmet>

            {/* Page Sections */}
            <Hero />
            <ClientLogoCarousel logos={logos} />
            <ProjectsPage />
            <FindByCity />
            <About />
            <Contact />
            <CounterSection />
        </div>
    );
}
