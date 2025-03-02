// EntityDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import { Film } from "../types/Film";
import { People } from "../types/People";
import { Planet } from "../types/Planet";
import { Vehicle } from "../types/Vehicle";
import { Starship } from "../types/Starship";
import type { Species as SpeciesType } from "../types/Species";
import "../styles/EntityDetail.css";
import RelatedList from "../components/RelatedList";

type EntityType = People | Planet | Starship | Film | SpeciesType | Vehicle;

const EntityDetail = ({ type }: { type: string }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateData = (location.state as { film?: Film })?.film;
  const [data, setData] = useState<EntityType | null>(stateData || null);
  const [loading, setLoading] = useState(!stateData);

  useEffect(() => {
    if (!data) {
      fetchData(type, id)
        .then((fetchedData) => {
          setData(fetchedData);
        })
        .finally(() => setLoading(false));
    }
  }, [data, type, id]);

  if (loading) return <Loader />;
  if (!data) return <div>Данные не найдены</div>;

  // Ключи, для которых нужно загрузить связанные сущности
  const multiLinkKeys = ["characters", "planets", "starships", "vehicles", "species", "films", "people", "homeworld", "residents", "pilots"];

  return (
    <div className="entity-container">
      <h1 className="entity-title">
        {"name" in data ? data.name : (data as Film).title}
      </h1>
      <div className="entity-details">
        {Object.entries(data).map(([key, value]) => {
          if (key === "url" || key === "created" || key === "edited") return null;
          if (multiLinkKeys.includes(key) && Array.isArray(value)) {
            return (
              <div key={key} className="entity-row">
                <span className="entity-key">{key.replace("_", " ").toUpperCase()}:</span>
                <span className="entity-value">
                  <RelatedList title={key} urls={value} />
                </span>
              </div>
            );
          }
          return (
            <div key={key} className="entity-row">
              <span className="entity-key">{key.replace("_", " ").toUpperCase()}:</span>
              <span className="entity-value">
                {Array.isArray(value) ? value.join(", ") : value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EntityDetail;
