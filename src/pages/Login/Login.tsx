import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import "./Login.css";
import { Copyright } from "../../components/Copyright/Copyright";
import { COLORS } from "../../constants/colors";
import { BgImage } from "../../HOC/BgImage/BgImage";
import { translations } from "../../translations/translation";
import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { CLEAN_UP_AUTH_STATE } from "../../store/actionTypes/authActionTypes";

const theme = createTheme({
  palette: {
    primary: { main: COLORS.white },
    secondary: { main: COLORS.secondary },
  },
  typography: { allVariants: { fontFamily: "'Poppins', sans-serif" } },
});

const Login = () => {
  const dispatch = useDispatch<any>();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = React.useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPassword) {
      timer = setTimeout(() => {
        setShowPassword(false);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showPassword]);

  React.useEffect(() => {
    dispatch({ type: CLEAN_UP_AUTH_STATE });
  }, [dispatch]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = () => {
    if (
      !!formData.email.error ||
      !!formData.password.error ||
      formData.email.value === "" ||
      formData.password.value === ""
    ) {
      if (!validateEmail(formData.email.value)) {
        setFormData((prevState) => ({
          ...prevState,
          email: {
            ...prevState.email,
            error: translations.emailNotValid,
          },
        }));
      }

      if (formData.password.value === "") {
        setFormData((prevState) => ({
          ...prevState,
          password: {
            ...prevState.password,
            error: translations.passwordEmpty,
          },
        }));
      }
      return;
    }
    dispatch(signIn(formData.email.value, formData.password.value));
  };

  const handleFieldChange = (e: any) => {
    const field = e.target.name;
    const value = e.target.value;

    if (field === "email") {
      setFormData((prevState) => ({
        ...prevState,
        email: {
          value,
          error: validateEmail(value) ? "" : translations.emailNotValid,
        },
      }));
    } else if (field === "password") {
      setFormData((prevState) => ({
        ...prevState,
        password: {
          value,
          error: value === "" ? translations.passwordEmpty : "",
        },
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "2rem",
          borderRadius: "0.5rem",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: COLORS.white }}>
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              InputLabelProps={{ sx: { color: COLORS.white } }}
              value={formData.email.value}
              error={!!formData.email.error}
              helperText={formData.email.error}
              onChange={handleFieldChange}
              InputProps={{ sx: { color: COLORS.white } }}
              FormHelperTextProps={{
                sx: { fontWeight: "Bold", marginLeft: "0" },
              }}
              className="login__textField"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              InputLabelProps={{ sx: { color: COLORS.white } }}
              value={formData.password.value}
              error={!!formData.password.error}
              helperText={formData.password.error}
              InputProps={{
                sx: {
                  color: COLORS.white,
                  borderColor: `${COLORS.white} !important`,
                  borderWidth: "2px",
                },
              }}
              className="login__textField"
              onChange={handleFieldChange}
              FormHelperTextProps={{
                sx: { fontWeight: "Bold", marginLeft: "0" },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  color="primary"
                  sx={{ color: COLORS.white }}
                  size="small"
                  onChange={() => setShowPassword((prevState) => !prevState)}
                />
              }
              label="Show password"
              sx={{ color: COLORS.white }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error.message}
              </Alert>
            )}
            <LoadingButton
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={handleSubmit}
              loading={loading}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/forgotpassword">
                  <Typography variant="body2" sx={{ color: COLORS.white }}>
                    Forgot password?
                  </Typography>
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/signup">
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.white }}
                    className="login__signup"
                  >
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4, color: COLORS.white }} />
      </Container>
    </ThemeProvider>
  );
};

export default BgImage(Login);
