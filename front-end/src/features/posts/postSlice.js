import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {current } from '@reduxjs/toolkit'
export const searchPost = createAsyncThunk(
    "postList", 
    async (name) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        const response = await axios.get(
          `http://localhost:5000/posts/search?name=${name}`
        ,config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
  });
  export const findPostByUserName = createAsyncThunk(
    "postListòUser", 
    async (name) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        const response = await axios.get(
          `http://localhost:5000/users/v1/${name}/posts`
        ,config);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
  });  


const postSlice = createSlice({
    name: 'posts',
    initialState:  {
        list: [],
        listFilter: [],
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
        },
        filterPost(state, action){
          if(action.payload == "")
          {
            const filtelist = state.list;
            return {...state,listFilter:filtelist}
          }
          const filtelist = state.list.filter((post) =>
            post.typeProduct == action.payload
          );
          return {...state,listFilter:filtelist}
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(searchPost.pending, (state, action) => {
          state.isLoading = true;
          state.hasError = false;
        })
          .addCase(searchPost.fulfilled, (state, action) => {
            state.list = action.payload;
            state.listFilter = action.payload;
            state.isLoading = false;
            state.hasError = false
          })
          .addCase(searchPost.rejected, (state, action) => {
            state.hasError = true
            state.isLoading = false;
          })
          .addCase(findPostByUserName.fulfilled, (state, action) => {
            state.list = action.payload;
            state.listFilter = action.payload;
            state.isLoading = false;
            state.hasError = false
          })
      }
});
export const selectList = state => state.postList.list;
export const selectLoadingState = state => state.postList.isLoading;
export const selectErrorState = state => state.postList.hasError;

const { actions, reducer } = postSlice;
export const { addPost, removePost,updatePost,filterPost} = actions;
export default reducer;