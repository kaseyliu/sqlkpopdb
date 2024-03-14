
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "./pages/Navbar";
import Companies from "./pages/Companies";
import Add from "./components/AddGroup";
import Update from "./pages/Update";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Songs from "./pages/Songs";

function App() {
  return (
    <ChakraProvider>
      <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/companies" element={<Companies />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/songs" element={<Songs />} />
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