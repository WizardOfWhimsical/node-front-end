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
    <div className="searchForm" onSubmit={preventRefresh}>
      <div>
        <input
          type="text"
          id="search"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
        <label htmlFor="search">Search todos</label>
      </div>
      <div>
        {/* seperate labels from select */}
        <div>
          <label htmlFor="sortBy">Sort by:</label>
          <select
            name="sortBy"
            id="sortBy"
            onChange={(e) => setSortField(e.target.value)}
            value={sortField}
          >
            <option value="title">Title</option>
            {/* <option value="priority">Priority</option> */}
            <option value="createdAt">Time Added</option>
            <option value="isCompleted">Is Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="direction">Direction:</label>
          <select
            name="direction"
            id="direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TodosViewForm;
