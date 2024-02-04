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
      <input
        style={{display: 'none'}}
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            name="title"
            label="Title"
            placeholder="Write title here"
            required
            fullWidth
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
            multiline
            rows={8}
          />
        </Grid>
        <Grid item
              sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
        >
          <Grid sx={{display: 'flex', alignItems: 'center'}}>
            <Button
              onClick={() => document.querySelector('input[name="image"]')?.click()}
              cursor="pointer"
              color="primary"
            >
              <AttachFileIcon fontSize="large"/>
            </Button>
            {formData.image && (
              <Input
                disabled
                style={{display: formData.image ? 'block' : 'none'}}
                value={formData.image.name}
              />
            )}
          </Grid>
          <Button type="submit" variant="contained" startIcon={<SendIcon/>}>
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewPost;
