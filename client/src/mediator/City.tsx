import { useParams } from 'react-router-dom';
import FindByCityData from '../pages/FindByCityData';

const FindByCityDataWrapper: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  return <FindByCityData city={city} />;
};

export default FindByCityDataWrapper;
