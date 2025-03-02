import { Link } from "react-router-dom";
import Pagination from "../../components/PaginationBar";
import { useState } from "react";
import useSwapiPagination from "../../hooks/useSwapiPagination";
import { People as PeopleType } from "../../types/People";
import Loader from "../../components/Loader";
import "../../styles/Resource.css";

const People = () => {
  const [page, setPage] = useState(1);
  const {
    data: peoples,
    totalCount,
    loading,
    error,
  } = useSwapiPagination<PeopleType>("people", page);
  const itemsPerPage = 10; // API возвращает 10 элементов на страницу по умолчанию

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Ошибка: {String(error)}</div>
  ) : (
    <div className="resource-container">
      <h2 className="resource-title">Персонажи</h2>
      <div className="resource-list">
        {peoples.map((people) => {
          // Извлекаем id персонажа из URL
          const peopleId = people.url.split("/").slice(-2, -1)[0];
          return (
            <Link
              key={people.url}
              to={`/people/${peopleId}`}
              state={{ people }}
              className="resource-card"
            >
              <div className="card-content">
                <h3 className="resource-name">{people.name}</h3>
                <p className="resource-info">
                  {people.gender && `Пол: ${people.gender}`}
                  <br />
                  {people.birth_year && `Год рождения: ${people.birth_year}`}
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

export default People;
