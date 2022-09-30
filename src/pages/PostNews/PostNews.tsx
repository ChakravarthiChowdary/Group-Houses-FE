import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { COLORS } from "../../constants/colors";
import "./PostNews.css";
import { Alert, IconButton } from "@mui/material";
import { translations } from "../../translations/translation";
import { useDispatch } from "react-redux";
import { postLatestNews } from "../../store/actions/latestNewsActions";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../store/store";
import { CLEAR_POST_NEWS_STATE } from "../../store/actionTypes/latestNewsActionTypes";

const theme = createTheme({
  palette: {
    secondary: { main: COLORS.secondary },
    primary: { main: COLORS.primary },
  },
  typography: { fontFamily: "Poppins" },
});

const Input = styled("input")({
  display: "none",
});

export const PostNews = () => {
  const dispatch = useDispatch<any>();
  const [files, setFiles] = useState<FileList | null>(null);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    title: { value: "", error: "" },
    description: { value: "", error: "" },
  });
  const [fileError, setFileError] = useState("");
  const { postLoading, postError, postSuccess } = useAppSelector(
    (state) => state.latestNews
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (postSuccess || postError) {
      timer = setTimeout(() => {
        dispatch({ type: CLEAR_POST_NEWS_STATE });
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [postSuccess, postError]);

  useEffect(() => {
    setFiles(null);
    setImage("");
    setFileError("");
    setFormData({
      title: { value: "", error: "" },
      description: { value: "", error: "" },
    });
  }, [postSuccess]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFiles(e.target.files);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handlePostClick = () => {
    if (
      formData.title.value === "" ||
      formData.description.value === "" ||
      !files
    ) {
      if (formData.title.value === "") {
        setFormData((prevState) => ({
          ...prevState,
          title: {
            value: "",
            error: translations.titleErrorInPostNews,
          },
        }));
      }
      if (formData.description.value === "") {
        setFormData((prevState) => ({
          ...prevState,
          description: {
            value: "",
            error: translations.descriptionErrorInPostNews,
          },
        }));
      }

      if (!files) {
        setFileError(translations.fileSelectErrorInPostNews);
      }
      return;
    }
    dispatch(
      postLatestNews(formData.title.value, formData.description.value, files)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <DynamicFeedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Post news
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="postTitle"
                  required
                  fullWidth
                  id="postTitle"
                  label="Title"
                  autoFocus
                  className={
                    !!formData.title.error
                      ? "postNews__error"
                      : "postNews__field"
                  }
                  value={formData.title.value}
                  error={!!formData.title.error}
                  helperText={formData.title.error}
                  FormHelperTextProps={{ sx: { ml: 0 } }}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      title: {
                        value: e.target.value,
                        error:
                          e.target.value === ""
                            ? translations.titleErrorInPostNews
                            : "",
                      },
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="postDescription"
                  label="Description"
                  name="postDescription"
                  className={
                    !!formData.description.error
                      ? "postNews__error"
                      : "postNews__field"
                  }
                  type="text"
                  multiline
                  maxRows={5}
                  minRows={3}
                  value={formData.description.value}
                  error={!!formData.description.error}
                  helperText={formData.description.error}
                  FormHelperTextProps={{ sx: { ml: 0 } }}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      description: {
                        value: e.target.value,
                        error:
                          e.target.value === ""
                            ? translations.descriptionErrorInPostNews
                            : "",
                      },
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {files ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={image}
                        style={{ width: 56, height: 56, borderRadius: "50%" }}
                      />
                      <Typography
                        variant="body2"
                        color="seagreen"
                        sx={{
                          fontWeight: "bold",
                          ml: 2,
                        }}
                      >
                        {files[0].name}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      color={fileError ? "error" : "secondary"}
                      sx={{ fontWeight: "bold" }}
                    >
                      {fileError ? fileError : "Select image to view"}
                    </Typography>
                  )}
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={onImageChange}
                    />
                    <Button
                      component="span"
                      color={fileError ? "error" : "secondary"}
                      variant="outlined"
                    >
                      Upload Photo
                    </Button>
                  </label>
                  {files && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        setFiles(null);
                        setFileError(translations.fileSelectErrorInPostNews);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
            {postSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Yay ! Posted your news.
              </Alert>
            )}
            <LoadingButton
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={handlePostClick}
              loading={postLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
