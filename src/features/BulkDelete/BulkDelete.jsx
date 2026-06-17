import { useContext, useState } from 'react';
import { context as UserContext } from '../../reducers/user.reducer.js';
import MessageDisplay from '../../shared/MessageDisplay/MessageDisplay.jsx';
import { FaRegTrashCan } from 'react-icons/fa6';
import style from './BulkDelete.module.css';
const confirmationMessage =
  'Are you sure you wish to delete all your completed tasks?';

function BulkDelete(props) {
  const [error, setError] = useState('');
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const { userState } = useContext(UserContext);

  async function handleConfirmation() {
    // const response = window.confirm('Are you sure?');

    // if (response) {
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
      setDisplayConfirmation(false);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
    // }
  }

  function handleOnclick() {
    setDisplayConfirmation(true);
  }
  function closeError() {
    setError('');
  }
  function closeConfirm() {
    setDisplayConfirmation(false);
  }

  return (
    <div className={style.bulkDeleteContainer}>
      {error ? (
        <MessageDisplay error={error} onClick={closeError} />
      ) : (
        displayConfirmation && (
          <MessageDisplay
            message={confirmationMessage}
            onClick={closeConfirm}
            onConfirm={handleConfirmation}
          />
        )
      )}
      {/* <div> */}
      <button type="button" onClick={handleOnclick}>
        <FaRegTrashCan />
      </button>
      {/* </div> */}
    </div>
  );
}

export default BulkDelete;
