import { Alert, Box, Container, Divider, Grid } from "@mui/material";

import "./Dashboard.css";
import { MainFeaturedPost } from "../../components/MainFeaturedNews/MainFeaturedNews";
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews";
import { useAppSelector } from "../../store/store";
import { LatestNews } from "../../types/StateTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLatestNews } from "../../store/actions/latestNewsActions";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

export const Dashboard = () => {
  const dispatch = useDispatch<any>();
  const { latestNews, loading, error } = useAppSelector(
    (state) => state.latestNews
  );

  useEffect(() => {
    dispatch(getLatestNews());
  }, [dispatch]);

  if (latestNews.length === 0 && loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Error
        message={error.message}
        handleRetryClick={() => dispatch(getLatestNews())}
      />
    );
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {latestNews.length > 0 ? (
          <MainFeaturedPost news={latestNews[0]} />
        ) : (
          <Box
            sx={{
              height: "80vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Alert severity="info" sx={{ fontSize: { sm: 18 } }}>
              You have no news yet, Create one !
            </Alert>
          </Box>
        )}
        <Grid container spacing={4}>
          {latestNews.slice(1).map((news: LatestNews) => (
            <FeaturedNews news={news} key={news._id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
