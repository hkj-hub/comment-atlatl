import { createSelector, createSlice } from '@reduxjs/toolkit';

export interface P2PState {
  peerId: string;
}

const initialState: P2PState = {
  peerId: '',
};

export const p2pSlice = createSlice({
  name: 'p2p',
  initialState,
  reducers: {
    setPeerId: (state, action) => {
      state.peerId = action.payload;
    },
  },
});

const stateSelector = (state: RootState) => state[p2pSlice.reducerPath];

export const peerIdSelector = createSelector(stateSelector, (c) => {
  return c.peerId;
});
