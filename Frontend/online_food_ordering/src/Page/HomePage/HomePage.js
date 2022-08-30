import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getData = async () => {
    const response = await fetch("https://localhost:7288/api/get-all-product")
      .then((response) => response.json());
    setProducts(response);

  }

  React.useState(() => {
    getData();
  }, [])

  const logout = () => {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    navigate("/");
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              Online Food Ordering
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex" }} m={3} >
              <Box sx={{ display: "flex" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Products
                </Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  About Us
                </Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Contact Us
                </Button>
              </Box>
            </Box>
            {
              (window.sessionStorage.getItem("email") !== null && window.sessionStorage.getItem("email") !== undefined)
                ?
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={sessionStorage.getItem("email")} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center"> Profile</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center"> Dashboard</Typography>
                      </MenuItem>
                      <Link to="/all-user">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center"> Manage User</Typography>
                      </MenuItem>
                      </Link>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={logout}> Log Out</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
                :
                <>
                  <Link to="/login">
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      Login
                    </Button>
                  </Link>
                </>

            }

          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {products &&
            products.map((product) => (
              <>
                <Grid item xs={2} sm={4} md={4} key={product.id}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={product.image}
                  />
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                      </IconButton>
                    }
                    title={product.productName}
                  />
                  <center>  <AddShoppingCartIcon /></center>

                </Grid>
              </>
            ))
          }
        </Grid>
      </Box>
    </>
  );
}