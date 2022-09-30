import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import { LatestNews } from "../../types/StateTypes";

interface IMainFeaturedNews {
  news: LatestNews;
}

export const MainFeaturedPost = (props: IMainFeaturedNews) => {
  const { news } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${news.photoUrls[0]})`,
      }}
    >
      {
        <img
          style={{ display: "none" }}
          src={news.photoUrls[0]}
          alt={news.title}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {news.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {`${news.description.slice(0, 100)}...`}
            </Typography>
            {news.description.length > 100 && (
              <RouterLink to={`/news/${news._id}`}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white !important",
                    borderColor: "white !important",
                  }}
                >
                  Read more
                </Typography>
              </RouterLink>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
