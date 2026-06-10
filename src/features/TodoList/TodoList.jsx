import { useMemo } from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

function TodoList({
  todoState,
  queryString,
  onCompleteTodo,
  onUpdateTodo,
  onDeleteTodo,
  statusFilter,
}) {
  const filteredList = useMemo(() => {
    console.log('filtering list...\n', todoState);
    let todos,
      message = null;
    switch (statusFilter) {
      case 'completed':
        console.log('completed');
        break;
      case 'active':
        console.log('active');
        break;
      case 'all':
        console.log('all');
        break;
      default:
        console.log('default');
    }
    return { todos, message };
  }, [todoState, statusFilter]);

  return (
    <>
      {todoState.isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <>
          {todoState.todoList.length === 0 ? (
            <p>
              {queryString
                ? 'Todos not found...'
                : 'Add a todo above to get started'}
            </p>
          ) : (
            <ul className={styles.todoList}>
              {todoState.todoList.map((todo) => (
                <TodoListItem
                  key={todo.id}
                  todo={todo}
                  onCompleteTodo={onCompleteTodo}
                  onUpdateTodo={onUpdateTodo}
                  onDeleteTodo={onDeleteTodo}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default TodoList;
