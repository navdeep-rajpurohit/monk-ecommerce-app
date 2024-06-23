import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import ProductPicker from "./ProductPicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useStyles } from "../styles";
import ProductTable from "./tables/ProductTable";
import initialProducts from "../assets/initialProduct";
import AddProductButton from "./AddProductButton";
import DraggableProduct from "./draggable/DraggableProduct";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#00815f",
    },
  },
});

const ProductList = () => {
  const classes = useStyles();
  const [productsList, setProductsList] = useState(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const handleAddProduct = (newProduct) => {
    setProductsList([...productsList, newProduct]);
  };

  useEffect(() => {
    console.log("main", productsList);
  }, [productsList]);

  const handleToggleVariants = (index) => {
    const updatedProducts = [...productsList];
    updatedProducts[index].showVariants = !updatedProducts[index].showVariants;
    setProductsList(updatedProducts);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = productsList.filter((_, i) => i !== index);
    setProductsList(updatedProducts);
  };

  const addRow = () => {
    const newRow = { id: productsList.length + 1, title: "Select product" };
    setProductsList([...productsList, newRow]);
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = productsList[dragIndex];
      const newData = [...productsList];
      newData.splice(dragIndex, 1);
      newData.splice(hoverIndex, 0, dragRow);
      setProductsList(newData);
    },
    [productsList]
  );

  const showMenu = (index) => {
    setDialogOpen(true);
    setEditIndex(index);
  };

  const handleToggleDiscountProduct = (index) => {
    const updatedProducts = [...productsList];
    updatedProducts[index].addDiscount = !updatedProducts[index].addDiscount;
    setProductsList(updatedProducts);
  };

  const handleToggleDiscountVariant = (productIndex, variantIndex) => {
    const updatedProducts = [...productsList];
    updatedProducts[productIndex].variants[variantIndex].addDiscount =
      !updatedProducts[productIndex].variants[variantIndex].addDiscount;
    console.log(updatedProducts);
    setProductsList(updatedProducts);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Typography variant="h5">Add Products</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: 7,
            flexWrap: "nowrap",
          }}
        >
          <Typography style={{ marginLeft: "5%" }}>Product</Typography>
          <Typography style={{ marginLeft: "25%" }}>Discount</Typography>
        </div>
        {productsList.map((item, index) => (
          <DraggableProduct
            key={item.id}
            index={index}
            id={item.id}
            moveRow={moveRow}
          >
            <ProductTable
              key={item.id}
              item={item}
              index={index}
              productsList={productsList}
              setProductsList={setProductsList}
              showMenu={showMenu}
              handleToggleDiscountProduct={handleToggleDiscountProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleToggleVariants={handleToggleVariants}
              handleToggleDiscountVariant={handleToggleDiscountVariant}
            />
          </DraggableProduct>
        ))}

        <AddProductButton addRow={addRow} />

        <ProductPicker
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onAddProduct={handleAddProduct}
          index={editIndex}
          productsList={productsList}
          setProductsList={setProductsList}
        />
      </div>
    </ThemeProvider>
  );
};

export default ProductList;
