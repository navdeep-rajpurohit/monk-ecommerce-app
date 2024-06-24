import { useCallback } from "react";
import { Button, TextField, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useStyles } from "../../styles/styles";
import VariantTable from "./VariantTable";
import DraggableVariant from "../draggable/DraggableVariant";

const ProductTable = ({
  item,
  index,
  productsList,
  setProductsList,
  showMenu,
  handleToggleDiscountProduct,
  handleDeleteProduct,
  handleDeleteVariant,
  handleToggleVariants,
  handleToggleDiscountVariant,
}) => {
  const classes = useStyles();

  const moveVariant = useCallback(
    (dragIndex, hoverIndex, productId) => {
      const newData = [...productsList];
      const product = newData.find((product) => product.id === productId);
      const dragVariant = product.variants[dragIndex];
      product.variants.splice(dragIndex, 1);
      product.variants.splice(hoverIndex, 0, dragVariant);
      setProductsList(newData);
    },
    [productsList]
  );

  return (
    <div key={item.id} className={classes.productList}>
      <div className={classes.productRow}>
        <DragIndicatorIcon color="default" className={classes.dragIcon} />
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
          ) : (
            <IconButton sx={{ visibility: "hidden" }}>
              <CloseIcon />
            </IconButton>
          )}
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
            <DraggableVariant
              key={variant.id}
              index={variantIndex}
              variant={variant}
              moveVariant={moveVariant}
              productId={item.id}
            >
              <VariantTable
                key={variant.id}
                variant={variant}
                variantIndex={variantIndex}
                handleToggleDiscountVariant={handleToggleDiscountVariant}
                index={index}
                handleDeleteVariant={handleDeleteVariant}
                productsList={item}
              />
            </DraggableVariant>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
