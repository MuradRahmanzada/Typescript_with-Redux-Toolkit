import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/store";
import { addTodo, remove, toggleCompleted } from "./features/todoSlice";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const onSave = () => {
    if (title.length > 0) {
      dispatch(addTodo(title));
    }
    setTitle("");
  };

  const onDelete = (id: string) => {
    dispatch(remove(id));
  };

  const toggle = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div className="h-screen flex py-28 justify-center">
      <div className="border-[3px] border-blue-600 rounded-lg p-10 h-min">
        <input
          type="text"
          className="py-1 px-5 border  border-blue-700 rounded-lg text-xl font-semibold outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          className="py-1 px-5 mx-2 text-white text-lg bg-blue-700 rounded-lg "
          onClick={onSave}
        >
          Save
        </button>
        {/* TodoList */}
        {todos.map((todo, index) => (
          <li key={todo.id} className="py-5 list-none">
            <span
              className={`text-xl font-semibold ${
                todo.completed && "line-through"
              }`}
            >
               {index} - {todo.title}
            </span>
            <div className="py-5">
              <button
                onClick={() => toggle(todo.id)}
                className={`bg-green-600 mx-2 rounded-md font-semibold text-white ${todo.completed ? "w-[120px]" : 'w-[100px]'} `}
              >
                {todo.completed ? "Not Completed" : "Completed"}
              </button>
              <button
                type="submit"
                onClick={() => onDelete(todo.id)}
                className="bg-red-600 mx-2 rounded-md font-semibold text-white w-[100px]"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
