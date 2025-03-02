import { useState } from "react";
import Loader from "../../components/Loader";
import { Starship } from "../../types/Starship";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import "../../styles/Resource.css";

const Starships = () => {
  const [page, setPage] = useState(1);
  const {
    data: starships,
    totalCount,
    loading,
    error,
  } = useSwapiPagination<Starship>("starships", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Ошибка: {String(error)}</div>
  ) : (
    <div className="resource-container">
      <h2 className="resource-title">Корабли</h2>
      <div className="resource-list">
        {starships.map((starship) => {
          // Извлекаем id персонажа из URL
          const starshipId = starship.url.split("/").slice(-2, -1)[0];
          return (
            <Link
              key={starship.url}
              to={`/people/${starshipId}`}
              state={{ starship }}
              className="resource-card"
            >
              <div className="card-content">
                <h3 className="resource-name">{starship.name}</h3>
                <p className="resource-info">
                  {starship.model && `Модель: ${starship.model}`}
                  <br />
                  {starship.manufacturer &&
                    `Производитель: ${starship.manufacturer}`}
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
export default Starships;
