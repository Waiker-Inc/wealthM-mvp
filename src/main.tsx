import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import logo from "./assets/BOLT_LOGO.png";

const setDarkMode = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// 초기 설정
setDarkMode();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />

    <button
      className="fixed top-0 right-0 w-[100px] h-[100px] cursor-pointer"
      onClick={() => {
        window.open("https://bolt.new/");
      }}
    >
      <img src={logo} alt="logo" />
    </button>
  </StrictMode>
);
