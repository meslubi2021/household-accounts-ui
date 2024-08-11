import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
    selectedDateStr: string;
}

const initialState: CalendarState = {
    selectedDateStr: "",
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDateStr: (state, action: PayloadAction<string>) => {
      state.selectedDateStr = action.payload
    }
  },
});

export const calendarActions = calendarSlice.actions;

export default calendarSlice.reducer;
