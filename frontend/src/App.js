import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Todos from "./components/todos/Todos";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  contentStyle: {
    margin: "30px auto",
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Container maxWidth="md">
          <Container className={classes.contentStyle} maxWidth="sm">
            <Switch>
              <Route path="/" component={Todos} />
            </Switch>
          </Container>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
