import React from 'react';
import { post } from '../../types';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { apiURL , defaultPostImage} from '../../constants';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

interface Props {
  post: post,
}

const NewsItem: React.FC<Props> = ({post}) => {
  const cardImage = apiURL + '/' + post.image
  const createDate = dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')

  return (
    <Card sx={{ width: 280, position: 'relative'}}>
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
      <div style={{display: 'flex', alignItems: 'center', justifyContent: "right", gap: 20}}>
        <Button
          sx={{textAlign: "right"}}
          component={Link}
          to={"/" + post.id}>Read more</Button>
        <Button >
          <DeleteIcon sx={{color: 'red'}}/>
        </Button>
      </div>
    </Card>
  );
};

export default NewsItem;