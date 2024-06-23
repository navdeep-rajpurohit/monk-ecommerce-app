import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box display="flex" p={2} border={1} borderColor="grey.300" gap={2}>
      <Box width={44} height={44} mx={2}>
        <img src="/monk-logo.svg" alt="Monk Logo" width="100%" height="100%" />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" fontWeight="medium" color="textSecondary">
          Monk Upsell and Cross-sell
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
