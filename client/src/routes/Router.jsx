import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBook";
import AddJournal from "../pages/AddJournal";
import UpdateJournal from "../pages/UpdateJournal";
import AddComic from "../pages/AddComic";
import UpdateComic from "../pages/UpdateComic";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  // BOOK
  { path: "/add/book", element: <AddBook /> },
  { path: "/update/book/:id", element: <UpdateBook /> },

  // JOURNAL
  { path: "/add/journal", element: <AddJournal /> },
  { path: "/update/journal/:id", element: <UpdateJournal /> },

  // COMIC
  { path: "/add/comic", element: <AddComic /> },
  { path: "/update/comic/:id", element: <UpdateComic /> },

 
]);

export default router;
