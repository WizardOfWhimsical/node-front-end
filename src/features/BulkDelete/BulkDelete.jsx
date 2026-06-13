function BulkDelete(props) {
  const idsToDelete = props.todoState.todoList
    .filter((todo) => todo.isCompleted === true)
    .map((t) => t.id);

  return (
    <div>
      <button type="button" onClick={() => console.log({ idsToDelete })}>
        [BULKDELETE]
      </button>
    </div>
  );
}

export default BulkDelete;
