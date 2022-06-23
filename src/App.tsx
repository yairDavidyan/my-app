import { Route, Routes } from "react-router-dom";
import Home from "./view/Home";
import About from "./view/About";
import ProductDetails from "./view/productDetails/ProductDetails";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  createTheme,
  IconButton,
  PaletteMode,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { useMemo, useState } from "react";

function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="productDetails/:id" element={<ProductDetails />} />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
