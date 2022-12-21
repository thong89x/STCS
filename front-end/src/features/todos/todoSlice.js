import { createSlice } from '@reduxjs/toolkit'
// 1. Setup todo slice
// todoSlice.js
const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addPost(state, action) {
            state.push(action.payload);
        },
        removePost(state, action) {
            state.splice(action.payload, 1)
        }
    }
});

const {  reducer ,actions } = todoSlice;
export const { addPost, removePost} = actions;
export default reducer;