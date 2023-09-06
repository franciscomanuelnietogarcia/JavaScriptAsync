import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Await  from "./Await";
import "./Await.css"

const  App = () => {
  return (
    <Router>
      <Await/>
    </Router>
  );
}

export default App;
