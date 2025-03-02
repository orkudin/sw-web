import { useEffect, useState } from "react";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import { Starship } from "../types/Starship";
import { Link } from "react-router-dom";

const Starships = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("starships").then(data => {
      setStarships(data.results);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Корабли</h2>
      <ul>
      {starships.map((starship) => {
          // Извлекаем id фильма из URL
          const starshipId = starship.url.split("/").slice(-2, -1)[0];
          return (
            <li key={starship.url}>
              {/* Передаем весь объект фильма через state */}
              <Link to={`/starships/${starshipId}`} state={{ starship }}>
                {starship.name}
              </Link>
            </li>
          );
        })}

        {starships.map(p => (
          <li key={p.url}><Link to={`/starships/${p.url.split("/").slice(-2, -1)[0]}`}>{p.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};
export default Starships;