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
  function handleDelete(event) {
    if (!isEditing) {
      return;
    }
    event.preventDefault();
    onDeleteTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }
  function eraserDelete(e) {
    e.preventDefault();
    onDeleteTodo({ ...todo, title: workingTitle });
  }
  return (
    <li className={styles.todoContainer}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <div className={styles.todo}>
            <TextInputWithLabel
              value={workingTitle}
              //take this
              onChange={handleEdit}
              ref={todoTitleInput}
              label=""
              elementId={todo.id}
            />
            <button type="button" onClick={handleCancel}>
              <FaBan size={16} />
            </button>
            {/* <button type="button" onClick={handleDelete}>
              Delete
            </button> */}
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
                eraserOnClick={() =>
                  onDeleteTodo({ ...todo, title: workingTitle })
                }
              />
            </span>
            {/* <ToolBar
              pencilOnClick={() => setIsEditing(true)}
              eraserOnClick={() => setIsEditing(true) & handleDelete}
            /> */}
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
