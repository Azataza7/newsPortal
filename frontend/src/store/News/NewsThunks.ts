import { createAsyncThunk } from '@reduxjs/toolkit';
import { comment, post, userComment } from '../../types';
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
      return response.data
    } catch (e) {
      throw new Error(e);
    }
  }
);