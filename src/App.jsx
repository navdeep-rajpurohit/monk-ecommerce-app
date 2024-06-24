import { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import theme from "./styles/styles";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "#fff" }}>
          <DndProvider backend={HTML5Backend}>
            <Header />
            <ProductList />
          </DndProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
