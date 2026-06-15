// import { Button } from 'react-bootstrap';
import styles from './MessageDisplay.module.css';

export default function MessageDisplay({
  message = '',
  error = '',
  onClick,
  onConfirm,
}) {
  return (
    <div className={styles.errorOverlay}>
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          {error ? 'A problem occured:' : 'Please Confirm?'}
          <br />
          {error || message}
        </p>
        <div>
          {message ? (
            <button
              className={styles.errorBtn}
              type="button"
              onClick={onConfirm}
            >
              Confirm
            </button>
          ) : null}
          <button className={styles.errorBtn} type="button" onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
