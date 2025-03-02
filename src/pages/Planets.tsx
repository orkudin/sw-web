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
      {planets.map((planet) => {
          // Извлекаем id фильма из URL
          const planetId = planet.url.split("/").slice(-2, -1)[0];
          return (
            <li key={planet.url}>
              {/* Передаем весь объект фильма через state */}
              <Link to={`/planets/${planetId}`} state={{ planet }}>
                {planet.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Planets;