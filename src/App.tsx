import { Route, Routes, useLocation } from "react-router";

import "./App.css";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { NavBar } from "./components/Navbar/NavBar";
import Login from "./pages/Login/Login";
import { useAppSelector } from "./store/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "./pages/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLogin } from "./store/actions/authActions";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { Tickets } from "./pages/Tickets/Tickets";
import { Profile } from "./pages/Profile/Profile";
import { PostNews } from "./pages/PostNews/PostNews";
import { CLEAR_POST_NEWS_STATE } from "./store/actionTypes/latestNewsActionTypes";
import { MyPosts } from "./pages/MyPosts/MyPosts";
import { Box, Container, Divider } from "@mui/material";

const theme = createTheme({
  typography: { allVariants: { fontFamily: "'Poppins', sans-serif" } },
});

function App() {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  useEffect(() => {
    dispatch({ type: CLEAR_POST_NEWS_STATE });
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      {user && (
        <Box sx={{ mb: 4 }}>
          <NavBar />
          <Container>
            <Divider />
          </Container>
        </Box>
      )}
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/postnews" element={<PostNews />} />
            <Route path="/myposts" element={<MyPosts />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
