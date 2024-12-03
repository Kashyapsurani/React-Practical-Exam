import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app-container">
      <Navbar/>
      <h1 className="text-center my-4">My Best Articles to Help You <br /> Build a Successful Blog</h1>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/add" element={<PostForm />} />
        <Route path="/update/:id" element={<PostForm />} />

      </Routes>
    </div>
  );
};

export default App;
