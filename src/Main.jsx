import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App.jsx";
import Games from "./pages/Games.jsx";
import Apps from "./pages/Apps.jsx";
import Movies from "./pages/Movies.jsx";
import Settings from "./pages/Settings.jsx";
import Frame from "./pages/Frame.jsx";
import Error from "./pages/404.jsx";
import Chat from "./pages/Chat.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/games" element={<Games />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/frame" element={<Frame />} />
      <Route path="/Chat" element={<Chat />} />


      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);
