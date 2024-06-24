import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#00815f",
    },
  },
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "2%",
    margin: "auto",
    bottom: 0,
    right: 0,
  },
  heading: {
    display: "flex",
    justifyContent: "start",
    width: "50%",
    padding: "2%",
  },
  tableHeader: {
    display: "flex",
    width: "50%",
    justifyContent: "space-around",
  },
  addProductButton: {
    display: "flex",
    justifyContent: "end",
    width: "50%",
  },
  header: {
    height: "40px",
    width: "100%",
    display: "flex",
    padding: "5%",
    border: "1px solid #E0E0E0",
    gap: 2,
  },
  productRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "2%",
    overflow: "hidden",
  },
  productInput: {
    display: "flex",
    alignItems: "center",
    marginRight: "4%",
  },
  discountButton: {
    backgroundColor: "#28a745",
    color: "white",
    "&:hover": {
      backgroundColor: "#218838",
    },
  },

  productList: {
    display: "flex",
    flexDirection: "column",
  },
  variantsContainer: {
    marginLeft: "10%",
    marginBottom: "7%",
  },
  variantRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "4%",
  },
  deleteButton: {
    color: "#d32f2f",
  },
  discountInput: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  pickerRoot: {
    minWidth: 500,
  },
  searchField: {
    marginBottom: 16,
  },

  selectedCount: {
    padding: "8px 16px",
    borderTop: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
  },
  loader: {
    position: "fixed",
    left: "48%",
    top: "45%",
    width: "100%",
    height: "100%",
    zIndex: "9999",
  },
  dragIcon: {
    cursor: "grab",
    "&:active": {
      cursor: "grabbing",
    },
  },
});

export { useStyles };

export default theme;
