import { useState } from "react";
import Loader from "../../components/Loader";
import { Starship } from "../../types/Starship";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import useSwapiPagination from "../../hooks/useSwapiPagination";

const Starships = () => {
  const [page, setPage] = useState(1);
  const { data: starships, totalCount, loading, error } = useSwapiPagination<Starship>("starships", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

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
export default Starships;