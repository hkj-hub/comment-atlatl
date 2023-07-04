import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { joinRoom } from '../../domain/skyway/room';
import { sendMessage } from '../../domain/skyway/repository';
import { getForce } from '../../domain/simulator/force';
import { simulator } from '../../domain/simulator';

export const joinP2PRoomAction = createAsyncThunk<string | null, void, { dispatch: AppDispatch }>(
  'joinP2PRoomAction',
  async (_req, thunkAPI) => {
    try {
      const id = await joinRoom((message) => {
        const force = getForce(message);
        simulator.addText({ text: message, position: { x: 200, y: 200 }, force });
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);
const initialState = {
  peerId: '',
};

export const p2pSlice = createSlice({
  name: 'p2pSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(joinP2PRoomAction.fulfilled, (state, action) => {
      if (action.payload) state.peerId = action.payload;
    });
  },
});

export const sendMessageAction = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'sendMessageAction',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (!state.p2p.peerId) return;
    sendMessage(req);
  },
);
