import React from "react";
import {
  Checkbox,
  ListItemText,
  ListSubheader,
  Typography,
  ListItemButton,
  Box,
} from "@mui/material";
import { Img } from "react-image";
import CircularProgress from "@mui/material/CircularProgress";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PickerList = ({
  index,
  product,
  handleToggleProduct,
  selectedProducts,
  handleToggleVariant,
}) => {
  return (
    <React.Fragment key={index}>
      <ListItemButton onClick={() => handleToggleProduct(product.id)} divider>
        <Checkbox
          color="secondary"
          checked={selectedProducts.some((item) => item.id === product.id)}
        />
        <Box sx={{ marginLeft: 1, marginRight: 1 }}>
          <LazyLoadImage
            src={product.image.src}
            width={40}
            height={40}
            effect="blur"
          />
        </Box>

        <ListItemText primary={product.title} />
      </ListItemButton>

      {product.variants.map((variant, i) => (
        <ListItemButton
          key={i}
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
