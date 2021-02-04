import React from "react";

const Todo = (props) => {
  return (
    <>
      {props.todo
        ? props.todo.map((todo, i) => (
            <div className="todo-card" key={i}>
              <div className="funtions">
                <button>X</button>
                <button>✓</button>
                <button>Edit</button>
              </div>
              <div className="description">
                <h2>{todo.title}</h2>
                <hr style={{ color: "white", margin: "4px" }} />
                <div className="info">{todo.todo}</div>
              </div>
            </div>
          ))
        : "nothing to show"}
    </>
  );
};

export default Todo;
