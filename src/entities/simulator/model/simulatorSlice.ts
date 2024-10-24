import { createSlice } from '@reduxjs/toolkit';
import { TextProps } from './domain/types';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SimulatorState {
  texts: TextProps[];
}

const initialState: SimulatorState = {
  texts: [],
};

export const simulatorSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    setTexts: (state, action: PayloadAction<TextProps[]>) => {
      state.texts = action.payload;
    },
  },
});
