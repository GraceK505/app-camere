import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";


interface DropState {
    isOpen: boolean;
}

const initialState: DropState = {
    isOpen: false,
};

const dropSlice = createSlice({
    name: "drop",
    initialState,
    reducers: {
        toggleDrop(state: any) {
            state.isOpen = !state.isOpen;
        },
        closeDrop(state: any) {
            state.isOpen = false;
        },
        setDrop(state: any, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        }
    }
});

export const { toggleDrop, closeDrop, setDrop } = dropSlice.actions;
export const selectIsDropOpen = (state: RootState) => state.drop.isOpen;
export default dropSlice.reducer;