import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        nsme: null,
        role: null,
    },
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload;
            state.role = action.payload.role;
            state.name = action.payload.name;
        },
        clearUser: (state) => {
            state.user = null;
            state.role = null;
            state.name = null;
        },
    },
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;