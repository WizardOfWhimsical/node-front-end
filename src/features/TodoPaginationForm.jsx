import { useSearchParams } from 'react-router';

function TodoPaginationForm({ isLoading, page, setPage, total, limit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  const handlePreviousPage = () => {
    const prevPage = Math.max(page - 1, 1);
    setPage(prevPage);
    if (prevPage === 1) {
      searchParams.delete('page');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ page: prevPage });
    }
  };

  const handleNextPage = () => {
    const nextPage = Math.min(page + 1, totalPages);
    setPage(nextPage);
    setSearchParams({ page: nextPage });
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={page === 1 || isLoading}
        >
          Previous
        </button>
        {!isLoading ? (
          <span>
            Page {page} of {totalPages}
          </span>
        ) : (
          <></>
        )}
        <button
          type="button"
          onClick={handleNextPage}
          disabled={page >= totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default TodoPaginationForm;
