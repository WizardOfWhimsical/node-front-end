import { useEffect, useRef, useState } from 'react';
import BulkDelete from '../features/BulkDelete';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving, todoState }) {
  const [workingTodo, setWorkingTodo] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const todoTitleInput = useRef(null);

  useEffect(() => {
    if (workingTodo === '') {
      if (isButtonDisabled) {
        return;
      }
      setIsButtonDisabled(true);
    } else {
      if (!isButtonDisabled) {
        return;
      }
      setIsButtonDisabled(false);
    }
  }, [workingTodo, isButtonDisabled]);

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = { title: workingTodo, isCompleted: false };
    onAddTodo(newTodo);
    setWorkingTodo('');
    todoTitleInput.current.focus();
  }

  return (
    <form className="addTodo" onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodo}
        labelText="Todo"
        onChange={(e) => setWorkingTodo(e.target.value)}
        elementId="todoTitle"
      />
      <div>
        <button disabled={isButtonDisabled}>
          {isSaving ? 'Saving...' : 'Add Todo'}
        </button>
        <BulkDelete todoState={todoState} />
      </div>
    </form>
  );
}

export default TodoForm;
