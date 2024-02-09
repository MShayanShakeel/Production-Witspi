import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedInstanceId: null,
};

const instanceSettingSlice = createSlice({
  name: 'instanceSettings',
  initialState,
  reducers: {
    setSelectedInstanceId: (state, action) => {
      state.selectedInstanceId = action.payload;
    },
  },
});

export const { setSelectedInstanceId } = instanceSettingSlice.actions;

export const userSettingReducer =  instanceSettingSlice.reducer;
