import { useEffect, useState } from 'react';

function TodosViewForm({
  queryString,
  setQueryString,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (localQueryString !== queryString) {
        setQueryString(localQueryString);
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString, queryString]);

  function preventRefresh(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={preventRefresh}>
      <div className="serchField">
        <label htmlFor="search">Search todos: </label>
        <input
          type="text"
          id="search"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>
      <div className="center">
        {/* seperate labels from select */}
        <label htmlFor="sortBy" className="justifyInbetween">
          Sort by:
          <select
            name="sortBy"
            id="sortBy"
            onChange={(e) => setSortField(e.target.value)}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="createdAt">Time Added</option>
            <option value="isCompleted">Is Completed</option>
          </select>
        </label>
        <label htmlFor="direction" className="justifyInbetween">
          Direction:
          <select
            name="direction"
            id="direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </form>
  );
}

export default TodosViewForm;
