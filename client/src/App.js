
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "./pages/Navbar";
import Companies from "./pages/Companies";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Groups from "./pages/Groups";
import Home from "./pages/Home";

function App() {
  return (
    <ChakraProvider>
      <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/companies" element={<Companies />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}
export default App;