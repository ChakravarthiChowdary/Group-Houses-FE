import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Container, createTheme, ThemeProvider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../store/actionTypes/authActionTypes";
import "./NavBar.css";

const pages = ["Home", "Tickets", "Post News", "My Posts"];

const theme = createTheme({
  palette: { primary: { main: "hsl(250, 60%, 99%)" } },
  typography: { allVariants: { fontFamily: "'Poppins', sans-serif" } },
});

export const NavBar = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    if (mobileMoreAnchorEl) setMobileMoreAnchorEl(null);
  }, [location.pathname]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/profile");
          setAnchorEl(null);
        }}
        className={
          location.pathname === `/profile` ? "navbar__selectedItem" : ""
        }
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch({ type: SIGN_OUT });
          navigate("/");
        }}
      >
        Sign out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {pages.map((page) => (
        <MenuItem
          key={page}
          onClick={() => navigate(page.toLowerCase().replace(/\s/g, ""))}
          className={
            location.pathname === `/${page.toLowerCase().replace(/\s/g, "")}`
              ? "navbar__selectedItem"
              : ""
          }
        >
          <IconButton size="large" color="inherit">
            {page === "Home" && <HomeIcon />}
            {page === "Tickets" && <LibraryBooksIcon />}
            {page === "Post News" && <DynamicFeedIcon />}
            {page === "My Posts" && <LibraryBooksIcon />}
          </IconButton>
          <p>{page}</p>
        </MenuItem>
      ))}
      <MenuItem
        onClick={() => navigate("/profile")}
        className={
          location.pathname === `/profile` ? "navbar__selectedItem" : ""
        }
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch({ type: SIGN_OUT });
          navigate("/");
        }}
      >
        <IconButton size="large" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Sign out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0}>
          <Container>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Our Houses
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                OHG
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              {user && (
                <>
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      sx={{ display: { xs: "none", md: "block" } }}
                      onClick={() =>
                        navigate(page.toLowerCase().replace(/\s/g, ""))
                      }
                      className={
                        location.pathname ===
                        `/${page.toLowerCase().replace(/\s/g, "")}`
                          ? "navbar__selectedItem"
                          : ""
                      }
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}

                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                      className={
                        location.pathname === `/profile`
                          ? "navbar__selectedAvatar"
                          : ""
                      }
                    >
                      <Avatar alt={user.name} src={user.photoUrl} />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
};
