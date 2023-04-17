import React from "react";
import ReactDOM from "react-dom/client";
import RouterDom from "./router/routes";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "./styles.scss";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterDom />);
