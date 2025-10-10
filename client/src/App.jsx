import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-200 transition-colors">
      <Navbar />
      <main className="p-6">
        <RouterProvider router={router} />
      </main>
    </div>
  );
};

export default App;
