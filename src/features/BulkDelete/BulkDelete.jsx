import { useState } from 'react';
import MessageDisplay from '../../shared/MessageDisplay/MessageDisplay.jsx';
import { FaRegTrashCan } from 'react-icons/fa6';
import style from './BulkDelete.module.css';
const confirmationMessage =
  'Are you sure you wish to delete all your completed tasks?';

function BulkDelete({ onBulkDelete }) {
  const [error, setError] = useState('');
  const [displayConfirmation, setDisplayConfirmation] = useState(false);

  const handleBulkDelete = () => {
    onBulkDelete();
    setDisplayConfirmation(false);
  };
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
            onConfirm={handleBulkDelete}
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
