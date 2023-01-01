import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// 1. Setup todo slice
// todoSlice.js

// const initialState = [{
//     id:47512,
//     nameProduct:"Áo thun",
//     typeProduct:"Áo thun", 
//     imageUrl:["https://th.bing.com/th/id/R.0fcbb14681efe4b5bc25813c16bde304?rik=r9vRoNDKrsRDTA&pid=ImgRaw&r=0",""]
// },{
//     id:50000,
//     nameProduct:"Áo khoác",
//     typeProduct:"Áo khoác",
//     imageUrl:["https://th.bing.com/th/id/OIP.THOLrXSux_tuWg88YA2PigHaJ4?pid=ImgDet&w=3600&h=4800&rs=1",""]
// },{
//     id:60000,
//     nameProduct:"Áo phao",
//     typeProduct:"Áo phao",
//     imageUrl:["https://images-na.ssl-images-amazon.com/images/I/61IbbtxnCIL._AC_UX466_.jpg",""]
// },{
//     id:71000,
//     nameProduct:"Quần jean",
//     typeProduct:"Quần jean",
//     imageUrl:["https://th.bing.com/th/id/OIP.SW3BoS5QYVOi5aMrPNycpQHaHa?pid=ImgDet&w=2020&h=2020&rs=1",""]
// }]



const postSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        addPost: (state, action) => { state.push(action.payload)
        console.log(state) },
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
        getall(state, action){
            axios.get("http://localhost:5000/posts").then(
                (res)=>{
                    return res.data
                }
            ).catch((err)=>{
                console.log(err)
            })
        }
    }
});

const { actions, reducer } = postSlice;
export const { addPost, removePost,updatePost, getall} = actions;
export default reducer;