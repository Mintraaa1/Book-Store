import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages (แก้ชื่อไฟล์ใหม่)
import AddBook from "../pages/AddBook";
import Home from "../pages/Home";
import UpdateBook from "../pages/UpdateBook";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotAllowed from "../pages/NotAllowed";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import ModOrAdmin from "../pages/ModOrAdmin";
import Profile from "../pages/Profile";

// ✅ กำหนด router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: (
      <AdminPage>
        <AddBook />
      </AdminPage>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: (
      <UserPage>
        <Profile />
      </UserPage>
    ),
  },
  {
    path: "/update/:id",
    element: (
      <ModOrAdmin>
        <UpdateBook />
      </ModOrAdmin>
    ),
  },
  {
    path: "/notallowed",
    element: <NotAllowed />,
  },
]);

export default router;
