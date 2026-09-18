import { configureStore, createSlice } from "@reduxjs/toolkit"

const reducerTheme = createSlice({
    name: "them",
    initialState: { isDark: localStorage.getItem('theme') === "dark" },
    reducers: {
        toggleTheme(state) {
            state.isDark = !state.isDark
            localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
        },
        setTheme(state, action) {
                state.isDark = action.payload
                localStorage.setItem('theme', action.payload ? "dark":"light")
        }
    }
})

export const actionTheme = reducerTheme.actions

const store = configureStore({
    reducer: {
        theme: reducerTheme.reducer
    }
})
export default store