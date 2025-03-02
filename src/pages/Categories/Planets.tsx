import { useState } from "react";
import Loader from "../../components/Loader";
import { Planet } from "../../types/Planet";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import "../../styles/Resource.css";

const Planets = () => {
  const [page, setPage] = useState(1);
  const {
    data: planets,
    totalCount,
    loading,
    error,
  } = useSwapiPagination<Planet>("planets", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Ошибка: {String(error)}</div>
  ) : (
    <div className="resource-container">
      <h2 className="resource-title">Планеты</h2>
      <div className="resource-list">
        {planets.map((planet) => {
          // Извлекаем id персонажа из URL, например "https://swapi.dev/api/people/1/" → "1"
          const planetId = planet.url.split("/").slice(-2, -1)[0];
          return (
            <Link
              key={planet.url}
              to={`/planets/${planetId}`}
              state={{ planet }}
              className="resource-card"
            >
              <div className="card-content">
                <h3 className="resource-name">{planet.name}</h3>
                <p className="resource-info">
                  {planet.population && `Популяция: ${planet.population}`}
                  <br />
                  {planet.terrain && `Природа: ${planet.terrain}`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};
export default Planets;
