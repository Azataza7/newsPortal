import { createAsyncThunk } from '@reduxjs/toolkit';
import { comment, post, userComment, userPost } from '../../types';
import axiosApi from '../../axiosApi';


export const fetchPosts = createAsyncThunk<post[], number | void>(
  'posts',
  async (id?: number) => {
    try {
      if (id) {
        const response = await axiosApi.get<post>(`/posts/${id}`);
        if (response.data) {
          return [response.data];
        }
      } else {
        const response = await axiosApi.get<post[]>('/posts');
        if (response.data) {
          return response.data;
        }
      }
    } catch (e) {
      console.error('Error: ', e);
    }
    return [];
  }
);

export const createPost = createAsyncThunk<void, userPost>(
  'posts/new',
  async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);

      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axiosApi.post('/posts', formData);
      return response.data;
    } catch (e) {
      console.error('Error: ', e);
    }
  }
);


export const deletePost = createAsyncThunk<void, number>(
  'post/delete',
  async (id) => {
    try {
      const response = await axiosApi.delete(`/posts/${id}`);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
);


export const fetchComments = createAsyncThunk<comment[], number>(
  'comments',
  async (id: number) => {
    try {
      const response = await axiosApi.get<comment>(`/comments?post_id=${id}`);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.error('Error: ', e);
    }
  }
);

export const createComment = createAsyncThunk<>(
  'comments/new',
  async (data: userComment) => {
    try {
      const response = await axiosApi.post('/comments', data);
      return response.data.status;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const deleteComment = createAsyncThunk<void, number>(
  'comments/delete',
  async (id) => {
    try {
      const response = await axiosApi.delete(`/comments/${id}`);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
);
