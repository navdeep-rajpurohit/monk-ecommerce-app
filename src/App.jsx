import { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  );
}

export default App;