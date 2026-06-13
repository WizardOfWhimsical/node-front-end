import { useContext } from 'react';
import { context as UserContext } from '../../reducers/user.reducer.js';
function BulkDelete(props) {
  const { userState } = useContext(UserContext);
  async function handleOnclick() {
    const response = window.confirm('Are you sure?');

    if (response) {
      const idsToDelete = props.todoState.todoList
        .filter((todo) => todo.isCompleted === true)
        .map((t) => t.id);
      try {
        await fetch('/api/tasks/bulk', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': userState?.userData?.csrfToken,
          },
          body: JSON.stringify({ tasks: idsToDelete }),
          credentials: 'include',
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <button type="button" onClick={handleOnclick}>
        [BULKDELETE]
      </button>
    </div>
  );
}

export default BulkDelete;
