import { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import ProductPicker from "./ProductPicker";
import { useStyles } from "../styles/styles";
import ProductTable from "./tables/ProductTable";
import initialProducts from "../assets/initialProduct";
import AddProductButton from "./AddProductButton";
import DraggableProduct from "./draggable/DraggableProduct";

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
    <Box className={classes.root}>
      <Box className={classes.heading}>
        <Box>
          {" "}
          <Typography variant="h5">Add Products</Typography>
        </Box>
      </Box>
      <Box className={classes.tableHeader}>
        <Box>
          {" "}
          <Typography style={{}}>Product</Typography>
        </Box>
        <Box>
          {" "}
          <Typography style={{}}>Discount</Typography>
        </Box>
      </Box>
      <Box className={classes.tableRows}>
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
      </Box>

      <Box className={classes.addProductButton}>
        {" "}
        <Box>
          {" "}
          <AddProductButton addRow={addRow} />
        </Box>
      </Box>

      <ProductPicker
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAddProduct={handleAddProduct}
        index={editIndex}
        productsList={productsList}
        setProductsList={setProductsList}
      />
    </Box>
  );
};

export default ProductList;
