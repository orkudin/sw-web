import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import { People } from "../types/People";
import { Planet } from "../types/Planet";
import { Film } from "../types/Film";
import { Vehicle } from "../types/Vehicle";
import { Starship } from "../types/Starship";
import type { Species as SpeciesType } from "../types/Species";
import "../styles/EntityDetail.css";

type EntityType = People | Planet | Starship | Film | SpeciesType | Vehicle;

const EntityDetail = ({ type }: { type: string }) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<EntityType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(type, id).then(setData).finally(() => setLoading(false));
  }, [type, id]);

  if (loading) return <Loader />;
  if (!data) return <div>Данные не найдены</div>;

  return (
    <div className="entity-container">
      <h1 className="entity-title">{"name" in data ? data.name : (data as Film).title}</h1>
      <div className="entity-details">
        {Object.entries(data).map(([key, value]) => (
          key !== "url" && key !== "created" && key !== "edited" && (
            <div key={key} className="entity-row">
              <span className="entity-key">{key.replace("_", " ").toUpperCase()}:</span>
              <span className="entity-value">{Array.isArray(value) ? value.join(", ") : value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default EntityDetail;