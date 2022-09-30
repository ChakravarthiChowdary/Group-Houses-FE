import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { COLORS } from "../../constants/colors";

import { CenteredContainer } from "../../HOC/CenteredContainer/CenteredContainer";

const theme = createTheme({ palette: { primary: { main: COLORS.primary } } });

const Loader = () => {
  return (
    <ThemeProvider theme={theme}>
      <CircularProgress color="primary" />
    </ThemeProvider>
  );
};

export default CenteredContainer(Loader);
