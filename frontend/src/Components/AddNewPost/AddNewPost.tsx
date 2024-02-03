import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createPost } from '../../store/News/NewsThunks';
import { Button, Grid, TextField, Input } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { userPost } from '../../types';

const AddNewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<userPost>({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createPost(formData));
    navigate('/');
  };

  return (
    <form className="send-container" style={{marginBottom: '70px'}} onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            name="title"
            label="Title"
            placeholder="Write title here"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            name="description"
            label="Description"
            placeholder="Write description here"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <input
            style={{display: 'none'}}
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          <AttachFileIcon
            onClick={() => document.querySelector('input[name="image"]')?.click()}
            cursor="pointer"
            sx={{color: '#000'}}
          />
          {formData.image && (
            <Input
              disabled
              style={{display: formData.image ? 'block' : 'none'}}
              value={formData.image.name}
            />
          )}
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" startIcon={<SendIcon/>}>
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewPost;
