import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) =>  action.payload ,
        removeRequest: (state, action) => {
            // Create a new array by filtering out the item with the matching _id
            const newArray = state.filter(req=> req._id !== action.payload);
            return newArray;
          }
    }
})

export const { addRequests , removeRequest } = requestSlice.actions;
export default requestSlice.reducer;