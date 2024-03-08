export function Todo({ completed, id, todotext, toggleTodo, deleteTodo }) {
return (
    <li>
        <label>
            <input type="checkbox" checked={completed} onChange={e => toggleTodo(id, e.target.checked)} />
            {todotext}
        </label>

        <button onClick={() => deleteTodo(id)} className="btn btn-danger">
            Delete
        </button>
    </li>
)}
