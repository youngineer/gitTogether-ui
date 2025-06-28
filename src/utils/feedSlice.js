import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addUserToFeed: (state, action) => action.payload,
        removeUserFromFeed: (state, action) => {
            return state.filter((availableUsers) => {
                availableUsers._id !== action.payload
            })
        }
    }
});


export const { addUserToFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;