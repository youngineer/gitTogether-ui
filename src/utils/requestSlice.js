import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => {
            const filteredRequests = state.filter((request) => {
                request._id !== action.payload
            })
        }
    }
});


export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;