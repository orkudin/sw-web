import {useState } from "react";
import Loader from "../../components/Loader";
import { Planet } from "../../types/Planet";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import useSwapiPagination from "../../hooks/useSwapiPagination";

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data: planets, totalCount, loading, error } = useSwapiPagination<Planet>("planets", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

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