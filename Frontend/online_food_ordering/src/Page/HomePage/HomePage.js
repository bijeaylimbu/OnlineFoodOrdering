import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
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
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';


const pages1 = ["Products", "Blog"];
const pages2 = ["About us", "Contact us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function HomePage() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [spacing, setSpacing] = React.useState(2);

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
                {pages1.map((page) => (
                  <Button
                    key={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {pages2.map((page) => (
                  <Button
                    key={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {products &&
            products.map((product) => (
              <>
            <Grid item xs={2} sm={4} md={4} key={product.id}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                  </IconButton>
                }
                title={product.productName}
              />
              <CardMedia
                component="img"
                height="194"
                image={product.image}
                alt="Paella dish"
              />
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                </IconButton>
                <IconButton aria-label="share">

                </IconButton>
              </CardActions>
              <Collapse timeout="auto" unmountOnExit>
              </Collapse>
            </Grid>
              </>
            ))
          }
        </Grid>
      </Box>
    </>
  );
}