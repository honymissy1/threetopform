import { createSlice } from "@reduxjs/toolkit";

export const ActiveTab = createSlice({
    name: 'Active Tab',
    initialState: {value: 1},
    reducers: {
        Tab: (state, action) =>{
            state.value = action.payload
        }
    }
})


export const { Tab } = ActiveTab.actions
export default ActiveTab.reducer