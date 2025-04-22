import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

// Main layout + pages
import App from "./src/App.jsx";
import Home from "./src/home.jsx";
import Problemset from "./src/problemset.jsx";
import Profile from "./src/profile.jsx";
import Sheets from "./src/sheets.jsx";
import Recommend from "./src/recommendation.jsx";
import Credentials from "./src/credentials.jsx";

// Standalone pages
import Login from "./src/login.jsx";
import Signup from "./src/signup.jsx";
import Admin from "./src/admin.jsx";
import { DataProvider } from "./src/contexts/userContext.jsx"; 

window.addEventListener("error", (event) => {
  console.error(event.error);
})
// window.onload= (event) => {
//   const path=window.location.pathname;
//   if(!path.startsWith("/problemset"))
//   window.localStorage.removeItem("searchParms");
// };

// Define the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DataProvider><App /></DataProvider>}>
        <Route index element={<Home />} />
        <Route path="problemset/*" element={<Problemset />} />
        <Route path="profile" element={<Profile />} />
        <Route path='recommended' element={<Recommend />} />
        <Route path="sheets/*" element={<Sheets />} />
        <Route path="credentials" element={<Credentials />}></Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<Admin />} />
    </>
  )
);
// Render the app
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
