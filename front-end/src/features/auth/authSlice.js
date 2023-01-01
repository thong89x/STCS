import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
const authSlice = createSlice({
    name: 'auth',
    initialState:  { token: null},
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
            const decoded = jwtDecode(accessToken)
            const { username, role } = decoded.UserInfo
            localStorage.setItem("userInfo", JSON.stringify({username,role}));
        },
        logOut: (state, action) => {
            state.token = null
            localStorage.removeItem("userInfo");
        },
    }
});

const {  reducer ,actions } = authSlice;
export const { setCredentials, logOut} = actions;
export default reducer;


