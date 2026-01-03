import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RuntimeUiState {
  selectedSpeed: number;
}

const initialState: RuntimeUiState = {
  selectedSpeed: 1,
};

const runtimeSlice = createSlice({
  name: "runtimeUi",
  initialState,
  reducers: {
    setSelectedSpeed(state, action: PayloadAction<number>) {
      state.selectedSpeed = action.payload;
    },
  },
});

export const { setSelectedSpeed } = runtimeSlice.actions;
export const runtimeReducer = runtimeSlice.reducer;
