import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TextProps } from '../../domain/simulator/types';

interface SimulatorState {
  texts: TextProps[];
}

const initialState: SimulatorState = {
  texts: [],
};

export const simulatorSlice = createSlice({
  name: 'SimulatorStateSlice',
  initialState,
  reducers: {
    setTexts: (state, action: PayloadAction<TextProps[]>) => {
      state.texts = action.payload;
    },
  },
});
