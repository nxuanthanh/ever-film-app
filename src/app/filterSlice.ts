import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigType } from 'models';

interface FilterState {
  filterConfig: ConfigType | {};
}

const initialState = {
  filterConfig: {},
} as FilterState;

const filterSlice = createSlice({
  name: 'filterConfig',
  initialState,
  reducers: {
    setFilterConfig: (state, action: PayloadAction<ConfigType | {}>) => {
      state.filterConfig = action.payload;
    },
  },
});

const { actions, reducer: filterReducer } = filterSlice;

export const { setFilterConfig } = actions;
export default filterReducer;
