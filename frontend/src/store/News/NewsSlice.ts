import { createSlice } from '@reduxjs/toolkit';
import { comment, post } from '../../types';
import { createComment, fetchComments, fetchPosts } from './NewsThunks';
import { RootState } from '../../app/store';

interface newsState {
  news: post[];
  comments: comment[];

  newsOnLoading: boolean;
  commentsOnLoading: boolean;
  onCreateCommentLoading: boolean;
}

const initialState: newsState = {
  news: [],
  comments: [],

  newsOnLoading: false,
  commentsOnLoading: false,
  onCreateCommentLoading: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setState(state, action) {
      state.news = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state: newsState) => {
      state.newsOnLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state: newsState, {payload: posts}) => {
      state.newsOnLoading = false;
      state.news = posts;
    });
    builder.addCase(fetchPosts.rejected, (state: newsState) => {
      state.newsOnLoading = false;
    });

    builder.addCase(fetchComments.pending, (state: newsState) => {
      state.commentsOnLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state: newsState, {payload: comments}) => {
      state.commentsOnLoading = false;
      state.comments = comments;
    });
    builder.addCase(fetchComments.rejected, (state: newsState) => {
      state.commentsOnLoading = false;
    });

    builder.addCase(createComment.pending, (state: newsState) => {
      state.onCreateCommentLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state: newsState) => {
      state.onCreateCommentLoading = false;
    });
    builder.addCase(createComment.rejected, (state: newsState) => {
      state.onCreateCommentLoading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;

export const selectNewsPosts = (state: RootState) => state.news.news;
export const selectCommentsPost = (state: RootState) => state.news.comments;


export const onLoadingPosts = (state: RootState) => state.news.newsOnLoading;
export const onLoadingComments = (state: RootState) => state.news.commentsOnLoading;
export const onCreatingComment = (state: RootState) => state.news.onCreateCommentLoading;