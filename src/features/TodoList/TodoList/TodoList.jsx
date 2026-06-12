import { useMemo } from 'react';
import TodoListItem from '../TodpoListItem/TodoListItem';
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
    const { todoList } = todoState;
    let todos = null;
    todoState.isLoading = true;
    switch (statusFilter) {
      case 'completed':
        todos = todoList.filter((todo) => todo.isCompleted);
        break;
      case 'active':
        todos = todoList.filter((todo) => !todo.isCompleted);
        break;
      case 'all':
        todos = todoList;
        break;
    }
    todoState.isLoading = false;
    return todos;
  }, [todoState, statusFilter]);

  return (
    <>
      {todoState.isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <>
          {filteredList.length === 0 ? (
            <p>
              {queryString
                ? 'Might be done for the day'
                : 'Do you need to add something to the day?'}
            </p>
          ) : (
            <ul className={styles.todoList}>
              {filteredList.map((todo) => (
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
