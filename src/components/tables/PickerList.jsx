import React from "react";
import {
  Checkbox,
  ListItemText,
  ListSubheader,
  Typography,
  ListItemButton,
  Avatar,
} from "@mui/material";

const PickerList = ({
  product,
  handleToggleProduct,
  selectedProducts,
  handleToggleVariant
}) => {
  return (
    <React.Fragment key={product.id}>
      <ListItemButton onClick={() => handleToggleProduct(product.id)} divider>
        <Checkbox
          color="secondary"
          checked={selectedProducts.some((item) => item.id === product.id)}
        />
        <Avatar
          variant="square"
          style={{ marginLeft: 5, marginRight: 5 }}
          src={product.image.src}
        ></Avatar>
        <ListItemText primary={product.title} />
      </ListItemButton>

      {product.variants.map((variant) => (
        <ListItemButton
          key={variant.id}
          onClick={() => handleToggleVariant(product.id, variant.id)}
          style={{ paddingLeft: 32 }}
          divider
        >
          <Checkbox
            color="secondary"
            checked={
              selectedProducts.some(
                (item) =>
                  item.id === product.id &&
                  item.variants?.some((variants) => variants.id === variant.id)
              ) || false
            }
          />
          <ListItemText primary={variant.title} />

          <ListSubheader>
            <Typography variant="body2">99 available</Typography>
          </ListSubheader>
          <ListSubheader>
            <Typography variant="body2">${variant.price}</Typography>
          </ListSubheader>
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default PickerList;
