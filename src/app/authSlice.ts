import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';

interface AuthState {
  user: User | null;
}

const initialState = {
  user: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer: authReducer } = authSlice;

export const { setCurrentUser } = actions;
export default authReducer;
