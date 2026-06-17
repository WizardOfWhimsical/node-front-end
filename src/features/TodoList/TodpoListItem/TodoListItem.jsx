import { useState, useEffect, useRef } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import ToolBar from '../../../shared/EditPencil';
import { FaArrowsRotate, FaBan } from 'react-icons/fa6';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const todoTitleInput = useRef(null);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  useEffect(() => {
    if (todoTitleInput.current && isEditing) {
      todoTitleInput.current.focus();
    }
  }, [isEditing]);

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleCancel() {
    setWorkingTitle(todo.title);
    console.log(isEditing);
    setIsEditing(false);
  }
  function handleUpdate(event) {
    if (!isEditing) {
      return;
    }
    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }
  function handleDelete(e) {
    e.preventDefault();
    console.log({ ...todo, title: workingTitle });
    onDeleteTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li className={styles.todoContainer}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <div className={styles.todo}>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              ref={todoTitleInput}
              label=""
              elementId={todo.id}
            />
            <button type="button" onClick={handleCancel}>
              <FaBan size={16} />
            </button>
            <button type="button" onClick={handleUpdate}>
              <FaArrowsRotate size={16} />
            </button>
          </div>
        ) : (
          <>
            <span className={styles.todo}>
              <label>
                <input
                  type="checkbox"
                  id={`checkbox${todo.id}`}
                  checked={todo.isCompleted}
                  onChange={() => onCompleteTodo(todo.id)}
                />
              </label>
              <>{todo.title}</>
              <ToolBar
                pencilOnClick={() => setIsEditing(true)}
                eraserOnClick={handleDelete}
              />
            </span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
