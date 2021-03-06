import React from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, ButtonGroup, Button } from "@material-ui/core";
import { Create, Delete, CheckCircle } from "@material-ui/icons";
import moment from "moment";

import { deleteTodo, checkTodo } from "../../store/actions/todoActions";

const useStyles = makeStyles({
  todoStyle: {
    margin: "20px auto",
    padding: "20px",
    border: "2px solid #bdbdbd",
    borderRadius: "9px",
    display: "flex",
    justifyContent: "space-between",
  },
  moreStyle: {
    color: "#8f8f8f",
  },
  isComplete: {
    color: "green",
  },
  checked: {
    textDecoration: "line-through",
  },
});

const Todo = ({ todo, setTodo, todos }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOnUpdateClick = (id) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    setTodo({ ...foundTodo });
    window.scrollTo({
      top: 1500,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCheck = (id) => {
    dispatch(checkTodo(id));
  };

  return (
    <>
      <div className={classes.todoStyle}>
        <div>
          {todo.isComplete ? (
            <Typography variant="subtitle1" className={classes.checked}>
              {todo.title}
            </Typography>
          ) : (
            <Typography variant="subtitle1">{todo.title}</Typography>
          )}
          <Typography variant="subtitle1">{todo.description}</Typography>

          <Typography variant="body2" className={classes.moreStyle}>
            Added: {moment(todo.date).fromNow()}
          </Typography>
        </div>
        <div>
          <ButtonGroup size="small" aria-label="outlined primary button group">
            {/* <Button onClick={() => handleCheck(todo.id)}>
              {todo.isComplete ? (
                <CheckCircle className={classes.isComplete} />
              ) : (
                <CheckCircle color="action" />
              )}
            </Button> */}
            <Button onClick={() => handleOnUpdateClick(todo.id)}>
              <Create color="primary" />
            </Button>
            <Button onClick={() => handleDelete(todo.id)}>
              <Delete color="secondary" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Todo;
