import axios from "axios";
import { toast } from "react-toastify";

export const url = "http://localhost:5000";

export const getTodos = (searchKeyword) => {
  return (dispatch) => {
    let getUrl = `${url}/tasks`;
    if (searchKeyword) {
      getUrl += `?searchKeyword=${searchKeyword}`;
    }
    axios
      .get(`${getUrl}`)
      .then((todos) => {
        dispatch({
          type: "GET_TODOS",
          todos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTodo = (newTodo) => {
  return (dispatch) => {
    axios
      .post(`${url}/tasks/`, { ...newTodo })
      .then((todo) => {
        dispatch({
          type: "ADD_TODO",
          todo,
        });
      })
      .catch((error) => {
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const updateTodo = (updatedTodo, id) => {
  return (dispatch) => {
    axios
      .put(`${url}/tasks/${id}`, updatedTodo)
      .then((todo) => {
        dispatch({
          type: "UPDATE_TODO",
          todo,
        });
      })
      .catch((error) => {
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/tasks/${id}`)
      .then((todo) => {
        dispatch({
          type: "DELETE_TODO",
          id,
          todo,
        });
      })
      .catch((error) => {
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const checkTodo = (id) => {
  return (dispatch) => {
    axios
      .patch(`${url}/tasks/${id}`, {})
      .then((todo) => {
        dispatch({
          type: "CHECK_TODO",
          todo,
        });
      })
      .catch((error) => {
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};
