import { Container, Row, Col, Form } from 'react-bootstrap';
import { locationData } from '../data/ProjectData';
import LocationCard from '../components/cards/LocationCard';
import React from 'react';
import { Helmet } from "react-helmet-async";

export default function ShowAllLocation() {
    const [locations, setLocations] = React.useState(locationData);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const filtered = locationData.filter((l) =>
            l.toLowerCase().includes(value.toLowerCase())
        );
        setLocations(filtered);
    };

    return (
        <Container>
            {/* Helmet for SEO */}
            <Helmet>
                <title>Explore All Locations | Propfix Realty</title>
                <meta
                    name="description"
                    content="Explore all available property locations with Propfix Realty. Find plots, villas, and apartments in the best areas across Chennai."
                />
                <meta
                    name="keywords"
                    content="real estate locations Chennai, property areas Chennai, Propfix Realty projects, plots villas apartments Chennai"
                />
                <meta property="og:title" content="Explore All Locations | Propfix Realty" />
                <meta
                    property="og:description"
                    content="Discover property locations in Chennai with Propfix Realty. Choose from plots, villas, and apartments across prime areas."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://propfixrealty.com/locations" />
                <meta property="og:image" content="https://propfixrealty.com/logo.jpg" />
            </Helmet>

            <Row className="mt-5 flex-column flex-lg-row justify-content-around align-items-center">
                <Col className="text-center text-lg-start mb-3 mb-lg-0">
                    <h3 className='fs-4'>Explore with all locations</h3>
                </Col>
                <Col className="text-start text-lg-end w-100 w-lg-auto">
                    <Form.Control
                        type="text"
                        placeholder="Search locations"
                        className="w-75 w-lg-auto border-0"
                        onChange={handleChange}
                        style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(152, 151, 151, 0.23) 0px 3px 6px' }}
                    />
                </Col>
            </Row>

            <Row className='my-4 g-3'>
                {locations.length > 0 ? (
                    locations.map((data, index) => (
                        <Col key={index} lg={3} sm={6} md={4}>
                            <LocationCard index={index} location={data} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <h5>No locations found</h5>
                    </Col>
                )}
            </Row>
        </Container>
    );
}
