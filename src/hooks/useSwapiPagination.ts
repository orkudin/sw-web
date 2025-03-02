import { useState, useEffect } from "react";
import { fetchData } from "../api/swapi";

interface SwapiPaginatedResult<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

function useSwapiPagination<T>(resource: string, page: number) {
  const [data, setData] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setLoading(true);
    // Вызываем API с query параметром для страницы
    fetchData(resource, undefined, `?page=${page}`)
      .then((result: SwapiPaginatedResult<T>) => {
        setData(result.results);
        setTotalCount(result.count);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [resource, page]);

  return { data, totalCount, loading, error };
}

export default useSwapiPagination;
