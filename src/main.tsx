import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NoteContextProvider from "./context/NoteContextProvider.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
