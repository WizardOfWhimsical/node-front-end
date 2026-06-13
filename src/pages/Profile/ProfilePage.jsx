import { useEffect, useState, useContext } from 'react';
import BarChart from './BarChart';
import ProfileStats from './ProfileStats';
import ErrorDisplay from '../../shared/ErrorDisplay/ErrorDisplay.jsx';
import { context as UserContext } from '../../reducers/user.reducer.js';

export default function ProfilePage() {
  const { userState } = useContext(UserContext);

  const [priorityStats, setPriorityStats] = useState({
    low: 0,
    medium: 0,
    high: 0,
  });
  const [todos, setToDos] = useState([]);
  const [todoStats, setToDoStats] = useState({});

  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  // const { email, token } = useAuth();
  const { total, active, completed } = todoStats;

  useEffect(() => {
    // if (!token) return;
    let firstPost = true;

    async function fetchTodos() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/tasks/stats');
        const data = (await response.json()).tasks;

        if (firstPost) {
          setError('');
          const total = data.length;
          const completed = data.filter((todo) => todo.isCompleted).length;
          const active = total - completed;

          setIsLoading(false);
          setToDos((p) => [...p]);
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
      firstPost = false;
    };
  }, []);

  // async function handlePriorityInformation() {
  //   if (todos.length > 0) {
  //     console.log('****No Priority Info***');
  //   }
  //   const filteredset = todos.filter((todo) => console.log(filteredset));
  //   console.log(filteredset);
  //   filteredset.map((todo) => {
  //     switch (todo.priority) {
  //       case 'low':
  //         setPriorityStats((prev) => ({ ...prev, low: prev.low++ }));
  //         break;
  //       case 'medium':
  //         setPriorityStats((prev) => ({ ...prev, medium: prev.medium++ }));
  //         break;
  //       case 'high':
  //         setPriorityStats((prev) => ({ ...prev, high: prev.high++ }));
  //         break;
  //     }
  //   });
  //   console.log('priority', priorityStats);
  //   console.log('todos', todos);
  // }

  return (
    <>
      {error && <ErrorDisplay error={error} onClick={() => setError('')} />}
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
        // priorityStats={priorityStats}
      />
    </>
  );
}
