import { Button, TextField, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useStyles } from "../../styles";
import VariantTable from "./VariantTable";

const ProductTable = ({
  item,
  index,
  productsList,
  showMenu,
  handleToggleDiscountProduct,
  handleDeleteProduct,
  handleToggleVariants,
  handleToggleDiscountVariant,
}) => {
  const classes = useStyles();

  return (
    <div key={item.id} className={classes.productList}>
      <div className={classes.productRow}>
        <DragIndicatorIcon color="default" />
        <Typography variant="body1" style={{ marginRight: 16 }}>
          {index + 1}.
        </Typography>
        <div className={classes.productInput}>
          <TextField
            variant="outlined"
            value={item.title}
            sx={{ boxShadow: 2, backgroundColor: "white" }}
            InputProps={{
              sx: { borderRadius: 0 },
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => showMenu(index)}>
                  <EditIcon />
                </IconButton>
              ),
            }}
            style={{ marginRight: 16, width: 300 }}
            size="small"
          />
          {item.addDiscount && (
            <>
              <TextField
                variant="outlined"
                value={item.discount?.value}
                InputProps={{
                  sx: {
                    borderRadius: 0,
                  },
                }}
                style={{
                  width: 60,
                  marginRight: 8,
                }}
                className={classes.discountInput}
                type="number"
                size="small"
                sx={{ boxShadow: 2 }}
              />
              <Select
                defaultValue={"flat"}
                sx={{ boxShadow: 2 }}
                displayEmpty
                size="small"
                inputProps={{
                  "aria-label": "Without label",
                }}
                style={{ width: 100, borderRadius: 0 }}
              >
                <MenuItem value={"flat"}>flat off</MenuItem>
                <MenuItem value={"percent"}>% off</MenuItem>
              </Select>{" "}
            </>
          )}
          {!item.addDiscount && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.discountButton}
              style={{ textTransform: "none", width: 168 }}
              onClick={() => handleToggleDiscountProduct(index)}
            >
              Add Discount
            </Button>
          )}
          {productsList.length > 1 ? (
            <IconButton
              onClick={() => handleDeleteProduct(index)}
              className={classes.deleteButton}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </div>
      <div style={{ height: 30 }}>
        {item.variants?.length > 1 ? (
          <Button
            onClick={() => handleToggleVariants(index)}
            style={{
              fontSize: "10px",
              float: "right",
            }}
          >
            <span style={{ textDecoration: "underline" }}>
              {item.showVariants ? "Hide variants" : "Show variants"}{" "}
            </span>
            {item.showVariants ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        ) : (
          ""
        )}
      </div>

      {(item.showVariants || item.variants?.length == 1) && (
        <div className={classes.variantsContainer}>
          {item.variants.map((variant, variantIndex) => (
            <VariantTable
              key={variant.id}
              variant={variant}
              variantIndex={variantIndex}
              handleToggleDiscountVariant={handleToggleDiscountVariant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
