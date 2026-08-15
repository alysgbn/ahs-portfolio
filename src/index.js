import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GradientBackdrop from "./components/GradientBackdrop";
// 1. import `HeroUIProvider` component
import { HeroUIProvider } from "@heroui/system";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <HeroUIProvider>
    <GradientBackdrop />
    <App />
  </HeroUIProvider>
  // </React.StrictMode>
);
