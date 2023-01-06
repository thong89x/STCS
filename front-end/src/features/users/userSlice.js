import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {current } from '@reduxjs/toolkit'
export const getAllUser = createAsyncThunk(
    "alluser", 
    async () => {
      try {
        console.log("hi")
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        const response = await axios.get(
          `http://localhost:5000/users/v2`
        ,config);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
  });

const userSlice = createSlice({
    name: 'userList',
    initialState:  {
        alllist :[],
        listUserofObject: []
    },
    reducers: {
        // addPost(state, action) {
        //     console.log(action.payload)
        //     state.push(action.payload);
        // },
        removeUser(state, action) {
            const removePostID = action.payload;
            //axios xoa o server
            return state.list.filter(post=> post.id !== removePostID);
        },
        updateUser(state, action){
            const newPost=action.payload;
            const postIndex = state.list.findIndex(post=>post.id===newPost.id)
            if(postIndex>=0){
                state[postIndex] = newPost;
            }
        },
        findUserbyObject(state, action){
          let listUserofObject = []
          const list= action.payload;
          list.forEach((order)=>{ 
            console.log(state.alllist)
            return listUserofObject.push(state.alllist.find(user=>user._id==order.userID))
          })
          return {...state,listUserofObject:listUserofObject}
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllUser.pending, (state, action) => {
          state.isLoading = true;
          state.hasError = false;
        })
          .addCase(getAllUser.fulfilled, (state, action) => {
            state.alllist = action.payload;
            state.isLoading = false;
            state.hasError = false
          })
          .addCase(getAllUser.rejected, (state, action) => {
            state.hasError = true
            state.isLoading = false;
          })
         
      }
});

const { actions, reducer } = userSlice;
export const { removeUser,updateUser,findUserbyObject} = actions;
export default reducer;