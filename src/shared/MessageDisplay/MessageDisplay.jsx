// import { Button } from 'react-bootstrap';
import styles from './MessageDisplay.module.css';

export default function MessageDisplay({ error, onClick }) {
  return (
    <div className={styles.errorOverlay}>
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          A problem occured:
          <br />
          {error}
        </p>
        <button className={styles.errorBtn} type="button" onClick={onClick}>
          Close
        </button>
      </div>
    </div>
  );
}
