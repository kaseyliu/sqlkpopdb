import Companies from "./pages/Companies";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div>
      <BrowserRouter>
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