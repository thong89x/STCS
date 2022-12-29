import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './features/todos/todoSlice';
import postSlice from './features/posts/postSlice';
import authSlice from './features/auth/authSlice';



export const store = configureStore({
    reducer: {
        todoList: todoSlice,
        postList: postSlice,
        auth: authSlice
    },
})