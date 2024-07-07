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
  const classes = useStyles(); // styles
  const [productsList, setProductsList] = useState(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false); // dialog toggle variable
  const [editIndex, setEditIndex] = useState(0); // state to keep the index of edit
  const [total, setTotal] = useState([0]);

  useEffect(() => {
    let total1 = productsList.map((item) =>
      item.variants?.reduce((total, item) => total + item?.price, 0)
    );
    total1 = total1.reduce((total, item) => total + Number(item), 0);

    setTotal(total1);
  }, [productsList]);

  // adding new row
  const handleAddProduct = (newProduct) => {
    setProductsList([...productsList, newProduct]);
  };

  // to show hide variant
  const handleToggleVariants = (index) => {
    const updatedProducts = [...productsList];
    updatedProducts[index].showVariants = !updatedProducts[index].showVariants;
    setProductsList(updatedProducts);
  };

  // to delete the product row
  const handleDeleteProduct = (index) => {
    const updatedProducts = productsList.filter((_, i) => i !== index);
    setProductsList(updatedProducts);
  };

  // to delete the variant row
  const handleDeleteVariant = (index, variantIndex) => {
    const updatedVariants = productsList[index].variants.filter(
      (_, i) => i != variantIndex
    );

    let updatedProducts = [...productsList];
    updatedProducts[index].variants = updatedVariants;

    setProductsList(updatedProducts);
  };

  // adding new row
  const addRow = () => {
    const newRow = { id: productsList.length + 1, title: "Select product" };
    setProductsList([...productsList, newRow]);
  };

  // drag row logic
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

  // show hide menu
  const showMenu = (index) => {
    setDialogOpen(true);
    setEditIndex(index);
  };

  // add discount on product logic
  const handleToggleDiscountProduct = (index) => {
    const updatedProducts = [...productsList];
    updatedProducts[index].addDiscount = !updatedProducts[index].addDiscount;
    setProductsList(updatedProducts);
  };

  // to add discount for variant
  const handleToggleDiscountVariant = (productIndex, variantIndex) => {
    const updatedProducts = [...productsList];
    updatedProducts[productIndex].variants[variantIndex].addDiscount =
      !updatedProducts[productIndex].variants[variantIndex].addDiscount;
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
            key={index}
            index={index}
            id={item.id}
            moveRow={moveRow}
          >
            <ProductTable
              key={index}
              item={item}
              index={index}
              productsList={productsList}
              setProductsList={setProductsList}
              showMenu={showMenu}
              handleToggleDiscountProduct={handleToggleDiscountProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleToggleVariants={handleToggleVariants}
              handleToggleDiscountVariant={handleToggleDiscountVariant}
              handleDeleteVariant={handleDeleteVariant}
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
      <Box><Typography>Total : $ {total || 0}</Typography></Box>
    </Box>
  );
};

export default ProductList;
