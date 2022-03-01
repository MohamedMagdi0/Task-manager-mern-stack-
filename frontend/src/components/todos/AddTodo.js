import React from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import { addTodo, updateTodo } from "../../store/actions/todoActions";
import SearchBar from "../SearchBar/SearchBar";
const useStyles = makeStyles({
  formStyle: {
    margin: "0px auto",
    padding: "30px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    marginLeft: "20px",
  },
});

const AddTodo = ({ todo, setTodo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.id) {
      const id = todo.id;
      const updatedTodo = {
        title: todo.title,
        isComplete: todo.isComplete,
        date: todo.date,
        id: todo.id,
        description: todo.description,
      };

      dispatch(updateTodo(updatedTodo, id));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };

      dispatch(addTodo(newTodo));
    }
    setTodo({ title: "", description: "", isComplete: false });
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      noValidate
      autoComplete="off"
      className={classes.formStyle}
      onSubmit={handleSubmit}
    >
      <div style={{ margin: "10px" }}>
        <TextField
          id="enter-todo"
          label="Task Title"
          variant="outlined"
          autoFocus
          fullWidth
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </div>

      <div className="container" style={{ margin: "10px" }}>
        <TextField
          id="enter-todo"
          label="Task Description"
          variant="outlined"
          autoFocus
          fullWidth
          multiline
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <div
          style={{
            paddingTop: "10px",
            display: "flex",
            flexDirection: "row-reverse",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            type="submit"
          >
            <Send />
          </Button>
        </div>
      </div>
      <div className="container" style={{ margin: "10px" }}>
        <SearchBar />
      </div>
    </form>
  );
};

export default AddTodo;
