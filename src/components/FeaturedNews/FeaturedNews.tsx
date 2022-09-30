import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Link as RouterLink, useLocation } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Avatar,
  Box,
  CardActions,
  CardHeader,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { LatestNews } from "../../types/StateTypes";
import { months } from "../../constants/Months";
import { DeleteOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteNews } from "../../store/actions/latestNewsActions";
import { memo } from "react";

interface IFeaturedNewsProps {
  news: LatestNews;
}

const FeaturedNews = (props: IFeaturedNewsProps) => {
  const { news } = props;
  const newsDate = new Date(news.createdDate);
  const location = useLocation();
  const dispatch = useDispatch<any>();

  return (
    <Grid item xs={12} md={4} sm={6}>
      <Card elevation={5} sx={{ maxHeight: "420px" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={news.userPhoto}
            ></Avatar>
          }
          title={
            news.title.length > 35
              ? `${news.title.slice(0, 35)}...`
              : news.title
          }
          subheader={`${
            months[newsDate.getMonth()]
          } ${newsDate.getDate()}, ${newsDate.getFullYear()}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={news.photoUrls[0]}
          alt={`${news.title} image`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {news.description.length > 80
              ? `${news.description.slice(0, 80)}...`
              : news.description}
          </Typography>
          {news.description.length < 80 && (
            <Box sx={{ visibility: "hidden", minHeight: 20 }}></Box>
          )}
          <RouterLink to={`/news/${news._id}`}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {news.description.length > 200 ? "Read more" : "View post"}
            </Typography>
          </RouterLink>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ThumbUpOffAltIcon />
          </IconButton>
          {location.pathname === "/myposts" && (
            <IconButton
              aria-label="delete"
              onClick={() => dispatch(deleteNews(news._id))}
            >
              <DeleteOutline color="error" />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default memo(FeaturedNews);
