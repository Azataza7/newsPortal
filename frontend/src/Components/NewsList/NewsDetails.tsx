import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onCreatingComment, onLoadingComments, selectCommentsPost, selectNewsPosts } from '../../store/News/NewsSlice';
import { comment, fullPost, userComment } from '../../types';
import { createComment, deleteComment, fetchComments, fetchPosts } from '../../store/News/NewsThunks';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import PersonIcon from '@mui/icons-material/Person';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddNewComment from '../AddNewComment/AddNewComment';

const NewsDetails = () => {
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const post: fullPost[] = useAppSelector(selectNewsPosts);
  const comments: comment[] = useAppSelector(selectCommentsPost);
  const onLoading: boolean = useAppSelector(onLoadingComments);

  const [author, setAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [onShowAddCommentContainer, setOnShowAddCommentContainer] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const handleSubmit = () => {
    const data: userComment = {
      post_id: parseInt(id ? id : ''),
      author: author,
      text: commentText,
    };

    dispatch(createComment(data));
    dispatch(fetchComments(id));

    setAuthor('');
    setCommentText('');
    setOnShowAddCommentContainer(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
    await dispatch(fetchComments(id));
  };

  if (onLoading) {
    return <CircularProgress />;
  }

  let commentList: JSX.Element[];

  if (comments.length === 0) {
    commentList = [<Typography key="no-comments">No comments</Typography>];
  } else {
    commentList = comments.map((comment) => (
      <Grid
        key={comment.id}
        style={{ border: '1px solid #242424', padding: 7, marginBottom: '15px', borderRadius: 10}}
      >
        <Grid sx={{ display: 'flex', alignItems: 'start', borderBottom: '1px solid #242424' }}>
          <PersonIcon />
          <Typography paragraph>{comment.author}</Typography>
        </Grid>
        <Grid sx={{ padding: 1 }}>
          <Typography paragraph>{comment.text}</Typography>
        </Grid>
        <Button sx={{ color: 'red' }} onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
      </Grid>
    ));
  }

  let postContainer: JSX.Element[] = post.map((postItem) => (
    <div key={postItem.id}>
      <Typography variant={'h3'}>{postItem.title}</Typography>
      <Typography sx={{ color: '#1976d2' }}>
        {dayjs(postItem.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </Typography>
      <p>{postItem.description}</p>
    </div>
  ));

  return (
    <>
      <Grid container spacing={2} sx={{ display: 'block' }}>
        <Grid item xs={12} md={10}>
          {postContainer}
        </Grid>
        <Grid item xs={10} md={4}>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant={'h5'}>Comments</Typography>
            <Button onClick={() => setOnShowAddCommentContainer(true)}>
              <AddCommentIcon fontSize="large" color="success" />
            </Button>
          </Grid>
          <Grid sx={{maxHeight: 800, overflowY: 'scroll'}}>
            {commentList}
          </Grid>
        </Grid>
      </Grid>
      <AddNewComment
        open={onShowAddCommentContainer}
        onClose={() => setOnShowAddCommentContainer(false)}
        author={author}
        setAuthor={setAuthor}
        commentText={commentText}
        setCommentText={setCommentText}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default NewsDetails;
