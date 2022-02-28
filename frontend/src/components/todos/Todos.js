import React, { useState } from "react";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";

const Todos = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    isComplete: false,
  });

  return (
    <>
      <ListTodos todo={todo} setTodo={setTodo} />
      <AddTodo todo={todo} setTodo={setTodo} />
    </>
  );
};

export default Todos;
