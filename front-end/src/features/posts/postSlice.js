import { createSlice } from '@reduxjs/toolkit'
// 1. Setup todo slice
// todoSlice.js

const initialState = [{
    id:47512,
    name:"Niga Slave",
    desc:"Mua 1 lần dùng trọn đời",
    imgUrl:"https://picsum.photos/id/110/300/300"
},{
    id:50000,
    name:"White Power",
    desc:"Dùng để thanh trừng Niga Slave",
    imgUrl:"https://picsum.photos/id/649/300/300"
},{
    id:60000,
    name:"Niga Slave",
    desc:"Mua 1 lần dùng trọn đời",
    imgUrl:"https://picsum.photos/id/859/300/300"
},{
    id:71000,
    name:"Niga Slave",
    desc:"Mua 1 lần dùng trọn đời",
    imgUrl:"https://picsum.photos/id/110/300/300"
}]
const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        addPost(state, action) {
            state.push(action.payload);
        },
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
    }
});

const { actions, reducer } = postSlice;
export const { addPost, removePost,updatePost} = actions;
export default reducer;