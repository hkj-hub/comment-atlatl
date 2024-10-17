import { createSlice } from '@reduxjs/toolkit';
import { TextProps } from '../../domain/simulator/types';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SimulatorState {
  texts: TextProps[];
}

const initialState: SimulatorState = {
  texts: [],
};

export const simulatorSlice = createSlice({
  name: 'simulatorState',
  initialState,
  reducers: {
    setTexts: (state, action: PayloadAction<TextProps[]>) => {
      state.texts = action.payload;
    },
  },
});
