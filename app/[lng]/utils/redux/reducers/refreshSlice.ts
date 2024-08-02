import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RefreshState {
    isCalenderPageRefresh: boolean;
    isAnalysisPageRefresh: boolean;
    isAssetPageRefresh: boolean;
    isSettingPageRefresh: boolean;
}

const initialState: RefreshState = {
    isCalenderPageRefresh: false,
    isAnalysisPageRefresh: false,
    isAssetPageRefresh: false,
    isSettingPageRefresh: false
};

const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    setIsCalenderPageRefresh: (state, action: PayloadAction<boolean>) => {
      state.isCalenderPageRefresh = action.payload
    },
    setIsAnalysisPageRefresh: (state, action: PayloadAction<boolean>) => {
      state.isAnalysisPageRefresh = action.payload
    },
    setIsAssetPageRefresh: (state, action: PayloadAction<boolean>) => {
      state.isAssetPageRefresh = action.payload
    },
    setIsSettingPageRefresh: (state, action: PayloadAction<boolean>) => {
      state.isSettingPageRefresh = action.payload
    },
  },
});

export const refreshActions = refreshSlice.actions;

export default refreshSlice.reducer;
