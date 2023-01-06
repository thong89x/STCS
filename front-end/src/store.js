import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './features/todos/todoSlice';
import postSlice from './features/posts/postSlice';
import authSlice from './features/auth/authSlice';
import userSlice from './features/users/userSlice';



export const store = configureStore({
    reducer: {
        todoList: todoSlice,
        postList: postSlice,
        auth: authSlice,
        userList: userSlice
    },
})