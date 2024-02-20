import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            state.userInfo = action.payload;
        },
        updateUser: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        deleteUser: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        signOut: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
})

export const { setCredentials, updateUser, deleteUser, signOut } = userSlice.actions;
export default userSlice.reducer;