import { useEffect, useState, useContext } from 'react';
// import { get } from '../utils/api';
// import { useAuth } from '../hooks/useAuth';
import BarChart from './BarChart';
import ProfileStats from './ProfileStats';
// import ErrorDisplay from '../shared/ErrorDisplay';
import { context as UserContext } from '../../reducers/user.reducer.js';

export default function ProfilePage() {
  const { userState } = useContext(UserContext);

  const [todoStats, setToDoStats] = useState({});

  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  // const { email, token } = useAuth();
  const { total, active, completed } = todoStats;

  useEffect(() => {
    // if (!token) return;
    let firstPost = false;

    async function fetchTodos() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/tasks');
        const data = (await response.json()).tasks;

        if (!firstPost) {
          setError('');
          const total = data.length;
          const completed = data.filter((todo) => todo.isCompleted).length;
          const active = total - completed;

          setIsLoading(false);
          setToDoStats({ total, completed, active });
        }
      } catch (error) {
        setIsLoading(false);
        setError(`Error loading statistics: ${error.message}`);
      }
    }
    fetchTodos();
    return () => {
      console.log('one render ran clean up');
      firstPost = true;
    };
  }, []);

  return (
    <>
      {/* {error && <ErrorDisplay error={error} onClick={() => setError('')} />} */}
      {isloading ? (
        <h1> One moment while we calculate...</h1>
      ) : (
        <BarChart
          total={total}
          active={active}
          completed={completed}
          name={userState.userData.name}
        />
      )}
      <hr />
      <ProfileStats
        name={userState.userData.name}
        total={total}
        active={active}
        completed={completed}
      />
    </>
  );
}
