import { useEffect, useState } from "react";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import { Film } from "../types/Film";
import { Link } from "react-router-dom";

const Films = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("films").then(data => {
      setFilms(data.results);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Фильмы</h2>
      <ul>
        {films.map(p => (
          <li key={p.url}><Link to={`/films/${p.url.split("/").slice(-2, -1)[0]}`}>{p.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};
export default Films;