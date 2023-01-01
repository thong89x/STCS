import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const getAllPost = createAsyncThunk(
    "postList", 
    async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/posts"
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
  });
  


const postSlice = createSlice({
    name: 'posts',
    initialState:  {
        list: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        addPost: (state, action) => { state.push(action.payload)
        },
        // addPost(state, action) {
        //     console.log(action.payload)
        //     state.push(action.payload);
        // },
        removePost(state, action) {
            const removePostID = action.payload;
            //axios xoa o server
            return state.filter(post=> post.id !== removePostID);
        },
        updatePost(state, action){
            const newPost=action.payload;
            const postIndex = state.findIndex(post=>post.id===newPost.id)
            if(postIndex>=0){
                state[postIndex] = newPost;
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllPost.pending, (state, action) => {
          state.isLoading = true;
          state.hasError = false;
        })
          .addCase(getAllPost.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
            state.hasError = false
          })
          .addCase(getAllPost.rejected, (state, action) => {
            state.hasError = true
            state.isLoading = false;
          })
      }
});
export const selectLoadingState = state => state.postList.isLoading;
export const selectErrorState = state => state.postList.hasError;

const { actions, reducer } = postSlice;
export const { addPost, removePost,updatePost, getall} = actions;
export default reducer;