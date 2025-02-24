import { useEffect, useState } from "react";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import type { Species as SpeciesType } from "../types/Species"; // <-- Используем "as SpeciesType"
import { Link } from "react-router-dom";

const Species = () => {
  const [species, setSpecies] = useState<SpeciesType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("species").then(data => {
      setSpecies(data.results);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Расы</h2>
      <ul>
        {species.map(p => (
          <li key={p.url}><Link to={`/species/${p.url.split("/").slice(-2, -1)[0]}`}>{p.name}</Link></li>
        ))}
      </ul>
    </div>
  );
  
};

export default Species;
