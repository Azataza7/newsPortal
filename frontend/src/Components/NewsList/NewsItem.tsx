import React from 'react';
import { post } from '../../types';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { apiURL, defaultPostImage } from '../../constants';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { deletePost, fetchPosts } from '../../store/News/NewsThunks';

interface Props {
  post: post,
}

const NewsItem: React.FC<Props> = ({post}) => {
  const dispatch = useAppDispatch();
  const cardImage = apiURL + '/' + post.image;
  const createDate = dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss');

  const handleDeletePost = async (id: number) => {
    await dispatch(deletePost(id));
    await dispatch(fetchPosts());
  };

  return (
    <Card sx={{width: 280, position: 'relative'}}>
      <CardActionArea>
        <CardMedia
          sx={{height: 180}}
          component="img"
          height="140"
          image={post.image ? cardImage : defaultPostImage}
          alt={post.id + 'photo'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography>
            {createDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'right', gap: 20}}>
        <Button
          sx={{textAlign: 'right'}}
          component={Link}
          to={'/' + post.id}>Read more</Button>
        <Button onClick={() => handleDeletePost(post.id)}>
          <DeleteIcon sx={{color: 'red'}}/>
        </Button>
      </div>
    </Card>
  );
};

export default NewsItem;