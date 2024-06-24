import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  TextField,
  Typography,
  IconButton,
  ListItemText,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useStyles } from "../styles/styles";
import PickerList from "./tables/PickerList";
import _ from "lodash"; // Import lodash for debounce function

const theme = createTheme({
  palette: {
    secondary: {
      main: "#00815f",
    },
  },
});

const ProductPicker = ({
  open,
  onClose,
  index,
  productsList,
  setProductsList,
}) => {
  const classes = useStyles();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  useEffect(() => {
    setSelectedProducts([]);
  }, [open, onClose]);

  useEffect(() => {
    const debouncedFetch = _.debounce(() => {
      setProducts([]); // Clear previous products when search term changes
      setCurrentPage(1); // Reset page to 1
      fetchData(); // Fetch data with new search term
    }, 500); // Adjust the debounce time as needed

    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/task/products?&search=${searchTerm}&page=${currentPage}`
      );
      if (!response.ok) {
        console.log("API error");
      }
      let jsonData = await response.json();
      if (jsonData.length === 0) {
        setHasMoreProducts(false);
      } else {
        setProducts([...products, ...jsonData]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollHeight - scrollTop <= clientHeight + 0.5) {
      if (hasMoreProducts) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleToggleProduct = (productId) => {
    const product = products.find((product) => product.id == productId);
    const isSelected = selectedProducts.some((item) => item.id === product.id);

    if (isSelected) {
      const newSelectedItems = selectedProducts.filter(
        (item) => item.id !== product.id
      );
      setSelectedProducts(newSelectedItems);
    } else {
      setSelectedProducts((existingProducts) => [...existingProducts, product]);
    }
  };

  const handleToggleVariant = (productId, variantId) => {
    const product = products.find((product) => product.id == productId);
    const isProductSelected = selectedProducts.some(
      (item) => item.id === product.id
    );
    const newSelectedItems = [...selectedProducts];

    if (isProductSelected) {
      const productIndexInSelected = selectedProducts.findIndex(
        (item) => item.id === product.id
      );

      const isVariantSelected = newSelectedItems[
        productIndexInSelected
      ].variants.some((variant) => variant.id === variantId);

      if (isVariantSelected) {
        newSelectedItems[productIndexInSelected].variants = newSelectedItems[
          productIndexInSelected
        ].variants.filter((variant) => variant.id !== variantId);

        if (newSelectedItems[productIndexInSelected].variants.length === 0) {
          newSelectedItems.splice(productIndexInSelected, 1);
        }
      } else {
        newSelectedItems[productIndexInSelected].variants.push(
          product.variants.find((variant) => variant.id === variantId)
        );
      }
    } else {
      newSelectedItems.push({
        ...product,
        variants: [
          product.variants.find((variant) => variant.id === variantId),
        ],
      });
    }

    setSelectedProducts(newSelectedItems);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProduct = () => {
    onClose;
    setSelectedProducts([]);

    let tempList = [...productsList];
    // tempList = tempList.filter(
    //   (product, i) => !product.default && i < index
    //
    tempList.splice(index, 1, ...selectedProducts);

    setProductsList(tempList);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        {isLoading ? (
          <CircularProgress className={classes.loader} color="secondary" />
        ) : (
          ""
        )}
        <DialogTitle>Select Products</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.pickerRoot} onScroll={handleScroll}>
          <TextField
            className={classes.searchField}
            variant="outlined"
            fullWidth
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List>
            {filteredProducts.length == 0 ? (
              <ListItemText primary="No product found" />
            ) : (
              ""
            )}
            {filteredProducts.map((product) => (
              <PickerList
                key={product.id}
                product={product}
                handleToggleProduct={handleToggleProduct}
                selectedProducts={selectedProducts}
                handleToggleVariant={handleToggleVariant}
              />
            ))}
          </List>
        </DialogContent>
        <Box className={classes.selectedCount}>
          <Typography variant="body2">
            {selectedProducts.length} product
            {selectedProducts.length !== 1 ? "s" : ""} selected
          </Typography>
        </Box>
        <DialogActions>
          <Button
            onClick={onClose}
            style={{
              border: "1px solid #6b7280",
              color: "#6b7280",
              padding: "6px 20px",
              paddingLeft: "32px",
              paddingRight: "32px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={selectedProducts.length == 0}
            onClick={() => {
              addProduct();
              onClose();
            }}
            style={{
              padding: "7px 20px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProductPicker;
