import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {current } from '@reduxjs/toolkit'
export const getAllPost = createAsyncThunk(
    "postList", 
    async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        const response = await axios.get(
          `http://localhost:5000/posts`
        ,config);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
  });
  export const searchName = createAsyncThunk(
    "listSearch", 
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
    "orderList", 
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
        return response.data;
      } catch (error) {
        console.error(error);
      }
  });  
  export const findPostByListOrder = createAsyncThunk(
    "postListofUser", 
    async (list) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        let listPost = []
        if(list){
          const result = await list.map(async order => {
            // console.log(order)
            const response = await axios.get(`http://localhost:5000/posts/${order.postID}`,config)
            const post = response.data
            const name = post.nameProduct
            // delete Object.assign(post, {["id"]: post["_id"] })["_id"];
            // delete Object.assign(post, {["userID"]: post["userID"] })["userID"];
            // delete Object.assign(post, {["imageURL"]: post["imageURL"] })["imageURL"];
            // delete Object.assign(post, {["amountRegistry"]: post["amountRegistry"] })["amountRegistry"];
            // Object.preventExtensions(name);
            const significantinfor ={"nameProduct": name,priceProduct: post.priceProduct,imageURL:post?.imageURL[0]? post.imageURL[0]:"https://react.semantic-ui.com/images/wireframe/square-image.png" }
            list.push(significantinfor)
            listPost = [...listPost, significantinfor]
            // Object.assign(listPost, significantinfor)
            // listPost = [...listPost,response.data]
            
          }).then(()=>{
            return listPost;
          })
          return result
          
        }
        // return listPost;
      } catch (error) {
        console.error(error);
      }
  });  

const postSlice = createSlice({
    name: 'posts',
    initialState:  {
        allpost: [],
        listSearch: [],
        listFilter: [],
        listPostodRegistry : [],
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
            return state.list.filter(post=> post.id !== removePostID);
        },
        updatePost(state, action){
            const newPost=action.payload;
            const postIndex = state.list.findIndex(post=>post.id===newPost.id)
            if(postIndex>=0){
                state[postIndex] = newPost;
            }
        },
        filterPost(state, action){
          if(action.payload == "")
          {
            const filtelist = state.listSearch;
            return {...state,listFilter:filtelist}
          }
          const filtelist = state.listSearch.filter((post) =>
            post.typeProduct == action.payload
          );
          return {...state,listFilter:filtelist}
        },
        searchName(state, action){
          if(action.payload == "")
          {
            const listSearch = state.list;
            return {...state,listSearch:listSearch};
          }
          const filtelist = state.listSearch.filter((post) =>
            post.typeProduct == action.payload
          );
          return {...state,listFilter:filtelist}
        },
        findPostofRegistry(state, action){
          let listPostodRegistry = []
          const list= action.payload;
          list.forEach((order)=>{ 
            return listPostodRegistry.push(state.allpost.find(post=>post._id==order.postID))
          })
          return {...state,listPostodRegistry:listPostodRegistry}
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllPost.pending, (state, action) => {
          state.isLoading = true;
          state.hasError = false;
        })
          .addCase(getAllPost.fulfilled, (state, action) => {
            state.allpost = action.payload;
            state.listSearch = action.payload;
            state.listFilter = action.payload;
            state.isLoading = false;
            state.hasError = false
          })
          .addCase(getAllPost.rejected, (state, action) => {
            state.hasError = true
            state.isLoading = false;
          })
          .addCase(findPostByUserName.fulfilled, (state, action) => {
            state.listSearch = action.payload;
            state.listFilter = action.payload;
            state.isLoading = false;
            state.hasError = false
          })
          .addCase(searchName.fulfilled, (state, action) => {
            state.listSearch = action.payload;
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
export const { findPostofRegistry,addPost, removePost,updatePost,filterPost} = actions;
export default reducer;