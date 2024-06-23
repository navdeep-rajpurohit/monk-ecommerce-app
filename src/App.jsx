import { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <ProductList />
      </DndProvider>
    </>
  );
}

export default App;
