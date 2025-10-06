import { Container, Row, Col, Form } from 'react-bootstrap';
import LocationCard from '../components/cards/LocationCard';
import React from 'react';
import { Helmet } from "react-helmet";
import locationApi from '../services/locationApi';

interface CityData {
  location: string,
  des: string,
  price: string;
}

export default function ShowAllLocation() {
    const [locations, setLocations] = React.useState<CityData[]>([]);
    const [allLocations, setAllLocations] = React.useState<CityData[]>([]); 

    React.useEffect(() => {
        window.scrollTo(0, 0);
        const fetchLocations = async () => {
            const res = await locationApi.getLocations();
            setLocations(res.locations);
            setAllLocations(res.locations);
        }
        fetchLocations();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!value.trim()) {
            setLocations(allLocations);
            return;
        }
        const filtered = allLocations.filter((l) =>
            l.location.toLowerCase().includes(value.toLowerCase())
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
                            <LocationCard index={index} location={data.location} />
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
