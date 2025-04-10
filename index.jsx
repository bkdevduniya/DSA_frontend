import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import Home from "./src/home.jsx";
import App from "./src/App.jsx";
import Problemset from "./src/problemset.jsx";
import Profile from "./src/profile.jsx";
import Auth from "./src/auth.jsx";
import Sheets from "./src/sheets.jsx";
       
// Define the router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="problemset" element={<Problemset />} />
      <Route path="profile" element={<Profile />} />
      <Route path="auth" element={<Auth />} />
      <Route path="sheets" element={<Sheets />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
);



// Render the app
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
