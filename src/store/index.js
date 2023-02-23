import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/trainerName.slice"
import colors from "./slices/colors.slice"
import darkMode from "./slices/darkMode.slice"

const store = configureStore({
    reducer:{
        nameTrainer,
        colors,
        darkMode
    }
})


export default store;