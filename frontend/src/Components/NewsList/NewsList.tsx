import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onLoadingPosts, selectNewsPosts } from '../../store/News/NewsSlice';
import { fetchPosts } from '../../store/News/NewsThunks';
import { CircularProgress, Grid } from '@mui/material';
import NewsItem from './NewsItem';
import { post } from '../../types';

const NewsList = () => {
  const dispatch = useAppDispatch();

  const posts: post[] = useAppSelector(selectNewsPosts);
  const onLoading: boolean = useAppSelector(onLoadingPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (onLoading) {
    return <CircularProgress/>;
  }

  const postsList: JSX.Element[] = posts.map((post) => (
    <NewsItem key={post.id} post={post}/>
  ))

  return (
    <Grid
      container
      flexDirection={"row"}
      gap="10px"
      spacing={5}
      className="threads-container"
      sx={{justifyContent: "center"}}
    >
      {postsList}
    </Grid>

  );
};

export default NewsList;