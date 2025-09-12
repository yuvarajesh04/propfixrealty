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
    { src: urbantree, alt: "Urbantree", id: 12 },
    { src: urbanrise, alt: "Urbanrise", id: 1 },
    { src: lifestyle, alt: "Lifestyle Housing", id: 2 },
    { src: jainhousing, alt: "Jain Housing", id: 3 },
    { src: nutech, alt: "Nu Tech", id: 4 },
    { src: sriramproperties, alt: "Sriram Properties", id: 5 },
    { src: atroidlogo, alt: "Adroit Logo", id: 6 },
    { src: dra, alt: "DRA", id: 7 },
    { src: lml, alt: "LML Homes", id: 8 },
    { src: brigade, alt: "Brigade", id: 9 },
    { src: raidance, alt: "Raidance", id: 10 },
    { src: mp, alt: "MP", id: 11 },
    { src: sidarthhomes, alt: "Sidarth Homes", id: 13 },
];

export default function Home() {
    return (
        <div className="home-page">
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
