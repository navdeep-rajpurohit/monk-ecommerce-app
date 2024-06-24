import { Box, Typography } from "@mui/material";
import { useStyles } from "../styles/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }} width={"100%"}>
      <AppBar position="static" color="">
        <Toolbar>
          <Box width={44} height={44} mx={2}>
            <img
              src="/monk-logo.svg"
              alt="Monk Logo"
              width="100%"
              height="100%"
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Monk Upsell and Cross-sell
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
