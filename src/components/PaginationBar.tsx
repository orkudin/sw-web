import "../styles/PaginationBar.css";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  itemsPerPage: number;
}

const Pagination = ({ page, setPage, totalCount, itemsPerPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Назад
      </button>
      <span className="pagination-info">
        Страница {page} из {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
