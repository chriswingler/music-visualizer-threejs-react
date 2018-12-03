import React from "react";
import ReactDOM from "react-dom";
import Scene from "./Scene";

import "./styles.css";

function App() {
  return (
    <div>
      <Scene />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
