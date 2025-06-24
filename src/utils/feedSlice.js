import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addUserToFeed: (state, action) => action.payload,
        removeUserFromFeed: (state, action) => null
    }
});


export const { addUserToFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;