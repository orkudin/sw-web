import { useEffect, useState } from "react";
import { fetchData } from "../api/swapi";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import type { People as PeopleType } from "../types/People";
import Pagination from "../components/PaginationBar";

const People = () => {
  const [people, setPeople] = useState<PeopleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number | null>(null); // totalCount может быть null
  const itemsPerPage = 10;

  // Получаем totalCount ОДИН РАЗ при монтировании
  useEffect(() => {
    fetchData("people").then(data => {
      setTotalCount(data.count);
    });
  }, []);

  // Получаем данные о персонажах при изменении страницы ИЛИ totalCount
  useEffect(() => {
    if (totalCount === null) return; // Ждем, пока загрузится totalCount

    setLoading(true);
    const startId = (page - 1) * itemsPerPage + 1;
    const endId = Math.min(page * itemsPerPage, totalCount); // Исправлено

    Promise.all(
      Array.from({ length: endId - startId + 1 }, (_, i) =>
        fetchData(`people/${startId + i}`)
      )
    )
      .then(results => {
        setPeople(results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, totalCount, itemsPerPage]); // Зависим от page, totalCount, и itemsPerPage


  // Отображаем Loader, пока не загрузится totalCount ИЛИ пока загружаются данные
  if (loading || totalCount === null) return <Loader />;

  return (
    <div>
      <h2>Персонажи</h2>
      <ul>
        {people.map(p => (
          <li key={p.url}>
            <Link to={`/people/${p.url.split("/").slice(-2, -1)[0]}`}>{p.name}</Link>
          </li>
        ))}
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