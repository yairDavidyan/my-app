import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { FormControl, MenuItem, Select } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../context/ProductContext";

function Header({ categories, filterByCategory, setShowCart }) {
  function selectCategory(event) {
    filterByCategory(event.target.value);
    setCurrentCategory(event.target.value);
  }
  const [currentCategory, setCurrentCategory] = useState("All");
  const { cart } = useContext(ProductContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bali express
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                value={currentCategory}
                onChange={selectCategory}
                sx={{ color: "white" }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <IconButton
            onClick={() => (cart.length > 0 ? setShowCart(true) : "")}
          >
            <AddShoppingCartIcon sx={{ color: "#ed1566" }} />
          </IconButton>
          <Link style={{ color: "#ed1566" }} to="/about">
            About
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
