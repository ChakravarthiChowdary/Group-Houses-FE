import { CircularProgress, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews";
import Loader from "../../components/Loader/Loader";
import { getMyPosts } from "../../store/actions/latestNewsActions";
import { useAppSelector } from "../../store/store";
import { LatestNews } from "../../types/StateTypes";
import Error from "../../components/Error/Error";
import InfoAlert from "../../components/InfoAlert/InfoAlert";
import { useNavigate } from "react-router";

export const MyPosts = () => {
  const dispatch = useDispatch<any>();
  const { myPosts, myPostsError, myPostsLoading } = useAppSelector(
    (state) => state.latestNews
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyPosts());
  }, []);

  if (myPosts.length === 0 && myPostsLoading) {
    return <Loader />;
  }

  if (myPostsError) {
    return (
      <Error
        message={myPostsError.message}
        handleRetryClick={() => dispatch(getMyPosts())}
      />
    );
  }

  if (myPosts.length === 0) {
    return (
      <InfoAlert
        message="You have not added any news yet."
        buttonTitle="Post"
        handleClick={() => navigate("/postnews")}
      />
    );
  }

  return (
    <Container>
      <Grid container spacing={4}>
        {myPosts.map((post: LatestNews) => (
          <FeaturedNews news={post} key={post._id} />
        ))}
      </Grid>
    </Container>
  );
};
