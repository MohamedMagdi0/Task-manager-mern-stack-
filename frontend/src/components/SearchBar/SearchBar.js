import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getTodos } from "../../store/actions/todoActions";

const SearchBar = (todo) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [todo.id, dispatch]);

  return (
    <div>
      <TextField
        id="enter-todo"
        label="Search"
        variant="outlined"
        autoFocus
        fullWidth
        multiline
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(getTodos(e.target.value));
        }}
      />
    </div>
  );
};

export default SearchBar;
