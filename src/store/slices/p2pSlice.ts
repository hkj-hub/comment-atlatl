import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { joinRoom } from '../../domain/skyway/room';
import { sendMessage } from '../../domain/skyway/repository';
import { getForce } from '../../domain/simulator/force';
import { simulator } from '../../domain/simulator';
import { addMessage } from './messageSlice';
import { v4 as uuidv4 } from 'uuid'; // uuidをインポート

const createMessage = (message: string) => ({
  id: uuidv4(),
  message,
  timestamp: new Date().toString(),
});

export const joinP2PRoomAction = createAsyncThunk<string | null, void, { dispatch: AppDispatch }>(
  'joinP2PRoomAction',
  async (_req, thunkAPI) => {
    try {
      const id = await joinRoom((message) => {
        const force = getForce(message);
        simulator.addText({ text: message, position: { x: 200, y: 200 }, force });
        thunkAPI.dispatch(addMessage(createMessage(message)));
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);
interface P2PState {
  peerId: string;
}

const initialState: P2PState = {
  peerId: '',
};

export const p2pSlice = createSlice({
  name: 'p2p',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(joinP2PRoomAction.fulfilled, (state, action) => {
      if (action.payload) state.peerId = action.payload;
    });
  },
});

export const sendMessageAction = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>('sendMessageAction', async (req, thunkAPI) => {
  thunkAPI.dispatch(addMessage(createMessage(req)));
  const state = thunkAPI.getState();
  if (!state.p2p.peerId) return;
  sendMessage(req);
});
