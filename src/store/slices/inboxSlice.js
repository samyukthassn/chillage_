import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
};

const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
});

export const { addMessage } = inboxSlice.actions;
export default inboxSlice.reducer;
