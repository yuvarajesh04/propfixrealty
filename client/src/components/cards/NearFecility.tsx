import { Card } from "react-bootstrap";
import busStopIcon from "../../assets/amenities/bus-stop.jpg";
import graduationIcon from "../../assets/amenities/graduation-hat.jpg";
import healthCareIcon from "../../assets/amenities/healthcare.jpg";
import schoolIcon from "../../assets/amenities/school.jpg";
import metroIcon from "../../assets/amenities/seoul-metro-logo.jpg";
import railWayIcon from "../../assets/amenities/train-station.jpg";
import cinema from "../../assets/icons/cinema.jpg";
import itPark from "../../assets/amenities/worker.jpg";
import road from "../../assets/amenities/road.jpg";
import industial from "../../assets/amenities/factory.jpg";
import airport from "../../assets/amenities/airplane.jpg";

import '../../styles/NearFecility.css'

const facilityIconMap = {
  airport,
  industrial: industial,
  road,
  bus: busStopIcon,
  itpark: itPark,
  metro: metroIcon,
  hospital: healthCareIcon,
  school: schoolIcon,
  college: graduationIcon,
  railway: railWayIcon,
  entertainment: cinema,
  amusement: cinema,
  area: road,
};

interface NearFecilityProps {
  name: string;
  distance: string;
  type: string;
}

export default function NearFecility({ name, distance, type }: NearFecilityProps) {
  return (
    <Card className="facility-card shadow-sm border-0 m-2 flex-fill">
      <Card.Body className="d-flex align-items-center p-3">
        <div className="icon-wrapper me-3">
          <img
            src={facilityIconMap[type as keyof typeof facilityIconMap] || busStopIcon}
            alt={type}
          />
        </div>
        <div>
          <div className="fw-semibold">{name}</div>
          <div className="text-muted" style={{ fontSize: "0.85rem" }}>
            {distance}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
