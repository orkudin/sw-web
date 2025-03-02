import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import { useState } from "react";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import { People as PeopleType} from "../../types/People";

const People = () => {
  const [page, setPage] = useState(1);
  const { data: peoples, totalCount, loading, error } = useSwapiPagination<PeopleType>("people", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {String(error)}</div>;

  return (
    <div>
      <h2>Персонажи</h2>
      <ul>
      {peoples.map((people) => {
          // Извлекаем id фильма из URL
          const peopleId = people.url.split("/").slice(-2, -1)[0];
          return (
            <li key={people.url}>
              {/* Передаем весь объект фильма через state */}
              <Link to={`/people/${peopleId}`} state={{ people }}>
                {people.name}
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
export default People;