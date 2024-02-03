import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onCreatingComment, onLoadingComments, selectCommentsPost, selectNewsPosts } from '../../store/News/NewsSlice';
import { comment, fullPost, userComment } from '../../types';
import { createComment, deleteComment, fetchComments, fetchPosts } from '../../store/News/NewsThunks';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';

const NewsDetails = () => {
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const post: fullPost[] = useAppSelector(selectNewsPosts);
  const comments: comment[] = useAppSelector(selectCommentsPost);
  const onLoading = useAppSelector(onLoadingComments);
  const onSendingComment = useAppSelector(onCreatingComment);

  const [author, setAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

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
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
    await dispatch(fetchComments(id));
  };


  if (onLoading) {
    return <CircularProgress/>;
  }

  let commentList: JSX.Element[];

  if (comments.length === 0) {
    commentList = [<Typography key="no-comments">No comments</Typography>];
  } else {
    commentList = comments.map((comment) => (
      <div
        key={comment.id}
        style={{border: '1px solid #242424', padding: 5}}>
        <Typography paragraph>author:{comment.author}</Typography>
        <Typography paragraph>{comment.text}</Typography>
        <Button sx={{color: 'red'}} onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
      </div>
    ));
  }

  return (
    <>
      <Grid container spacing={2} sx={{display: 'block'}}>
        <Grid item xs={10} md={10}>
          {post.map((postItem, i) => (
            <div key={i}>
              <Typography variant={'h3'}>{postItem.title}</Typography>
              <Typography>
                {postItem.createdAt}
              </Typography>
              <p>{postItem.description}</p>
            </div>
          ))}
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant={'h5'}>Comments</Typography>
          {commentList}
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant={'h5'}>Add Comment</Typography>
          <TextField
            label="Author (not required)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button disabled={onSendingComment} variant="contained" onClick={handleSubmit}>Send</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NewsDetails;