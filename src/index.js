import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// 1. import `HeroUIProvider` component
import { HeroUIProvider } from "@heroui/system";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <HeroUIProvider>
    <div className="wrapper">
      <div className="gradient gradient-1"></div>
      <div className="gradient gradient-2"></div>
      <div className="gradient gradient-3"></div>
    </div>
    <App />
  </HeroUIProvider>
  // </React.StrictMode>
);
