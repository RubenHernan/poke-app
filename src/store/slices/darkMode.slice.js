import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: false,
    reducers:{
        setDarkMode: (state) => !state
    }
}) 

export default darkModeSlice.reducer

export const { setDarkMode} = darkModeSlice.actions