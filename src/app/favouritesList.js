import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
    name: 'favourites',
    initialState: {
        arr: [],
    },
    reducers: {
        add: (state, action) => {
            if (!state.arr.includes(action.payload)) {
                state.arr.push(action.payload)
            }
        },
        remove: (state, action) => {
            if (state.arr.includes(action.payload)) {
                state.arr = state.arr.filter(value => value !== action.payload)
            }
        },

    },
})
export const { add, remove } = itemsSlice.actions

export default itemsSlice.reducer