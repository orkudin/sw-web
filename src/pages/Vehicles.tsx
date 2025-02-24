import { useEffect, useState } from "react";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import { Vehicle } from "../types/Vehicle";
import { Link } from "react-router-dom";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("vehicles").then(data => {
      setVehicles(data.results);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Транспорт</h2>
      <ul>
        {vehicles.map(p => (
          <li key={p.url}><Link to={`/vehicles/${p.url.split("/").slice(-2, -1)[0]}`}>{p.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};
export default Vehicles;
