import Companies from "./pages/Companies";
import Add from "./pages/Add";
import Update from "./pages/Update";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" eleme
        <Route path="/companies" element={<Companies />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}
export default App;