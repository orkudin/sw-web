import { useEffect, useState } from "react";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import { Planet } from "../types/Planet";
import { Link } from "react-router-dom";

const Planets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("planets").then(data => {
      setPlanets(data.results);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Планеты</h2>
      <ul>
        {planets.map(p => (
          <li key={p.url}><Link to={`/planets/${p.url.split("/").slice(-2, -1)[0]}`}>{p.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};
export default Planets;