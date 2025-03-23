import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profileData: {},
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profileData = action.payload;
        },
    },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
