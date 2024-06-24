import { Button } from "@mui/material";
import { useStyles } from "../styles/styles";

const AddProductButton = ({ addRow }) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.addButton}
        onClick={addRow}
        color="secondary"
        style={{
          marginRight: 15,
          textTransform: "none",
          marginTop: 10,
          border: "solid 2px",
          fontWeight: "bold",
        }}
        size="large"
      >
        Add Product
      </Button>
    </div>
  );
};

export default AddProductButton;
