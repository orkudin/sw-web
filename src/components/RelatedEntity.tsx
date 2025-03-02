import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../api/swapi";

interface SWAPIEntity {
  name?: string;
  title?: string;
  [key: string]: unknown;
}

interface RelatedEntityProps {
  url: string;
}

const RelatedEntity = ({ url }: RelatedEntityProps) => {
  const [entity, setEntity] = useState<SWAPIEntity | null>(null);
  const [loading, setLoading] = useState(true);

  // Извлекаем endpoint и id из URL
  const parts = url.split("/").filter(Boolean);
  const apiIndex = parts.indexOf("api");
  const endpoint = parts[apiIndex + 1];
  const id = parts[apiIndex + 2];

  useEffect(() => {
    fetchData(endpoint, id)
      .then((data) => {
        setEntity(data as SWAPIEntity);
      })
      .catch((error) => {
        console.error("Ошибка загрузки связанной сущности", error);
      })
      .finally(() => setLoading(false));
  }, [url, endpoint, id]);

  if (loading) return <span>Загрузка...</span>;
  if (!entity) return <span>Не найдено</span>;

  const displayName = entity.title || entity.name ||  "Нет названия"; 

console.log(endpoint, id)

  return (
    <Link to={`/${endpoint}/${id}`} state={{ endpoint }}>
      {displayName}
    </Link>
    
  );
};

export default RelatedEntity;
