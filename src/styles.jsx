import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    top: "15%",
    left: "28%",
    margin: "auto",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "80vh",
  },
  productRow: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  productInput: {
    display: "flex",
    alignItems: "center",
    marginRight: 16,
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
    marginLeft: 40,
    marginBottom: 18,
  },
  variantRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
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
});

export { useStyles };
