import "./App.css";
import "./media-queries.css";
import Todo from "./Todo";
import { useState, useEffect } from "react";
import firebase from "./firebase";
function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  const [addTodo, setAddTodo] = useState([]);

  const addTodoBtn = (event) => {
    //here an event is fired wheven we click a button so we get that even to
    //later prevent page from refreshing the page at every submit

    event.preventDefault();

    //this operation is used to save data into the databse
    const todoRef = firebase.database().ref("todos");
    const todo = {
      todo: inputTodo,
      title: inputTitle,
    };
    todoRef.push(todo);

    //here we gonna use spead opearators so that we add new the values to the addTodo
    //array on the clcik of the button but keep the values inside taht already exsisted
    //(pushing values into an array)

    setAddTodo([...addTodo, inputTodo, inputTitle]);
    setInputTodo("");
    setInputTitle("");
  };

  useEffect(() => {
    const todoref2 = firebase.database().ref("todos");
    todoref2.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push(todos[id]);
      }

      setAddTodo(todoList);
    });
  }, [inputTodo]);

  return (
    <>
      <h1 dataText="Sticky-Notes" className="main-title">
        Sticky-Notes
      </h1>

      {/* here we wrap everything in the form so that when we hit enter after typing a value 
it will auto matically submit on enter press */}

      <form className="main-form" noValidate autoComplete="off">
        <input
          className="input-title"
          id="outlined-basic"
          placeholder="title"
          label="Type Something..."
          variant="standard"
          onChange={(event) => setInputTitle(event.target.value)}
          value={inputTitle}
          type="text"
        />
        <textarea
          className="input-todo"
          id="outlined-basic"
          placeholder="todo"
          onChange={(event) => setInputTodo(event.target.value)}
          value={inputTodo}
          rows="4"
          cols="50"
        />
        <button
          variant="contained"
          type="submit"
          onClick={addTodoBtn}
          className=" "
          disabled={!inputTodo || !inputTitle}
          color="primary"
        >
          Add
        </button>
      </form>

      <div className="todo-list-container">{<Todo todo={addTodo} />}</div>
    </>
  );
}

export default App;
