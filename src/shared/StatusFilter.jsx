import { useSearchParams } from 'react-router';
// import { Form } from 'react-bootstrap';

export default function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams('');
  const currentStatus = searchParams.get('status') || 'active';

  function handleStatusChange(status) {
    if (status === 'active') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', status);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="flex-column">
      <label htmlFor="statusFilter">Show:</label>
      <select
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="active">Active To-Dos</option>
        <option value="all">All To-Dos</option>
        <option value="completed">Completed To-Dos</option>
      </select>
    </div>
  );
}
