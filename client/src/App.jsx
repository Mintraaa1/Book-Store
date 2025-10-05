import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet /> 
      </main>
    </div>
  );
}

export default App;
