import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // uuidをインポート
import { initDb } from '@/domain/comment';
import { simulator } from '../../domain/simulator';
import { getForce } from '../../domain/simulator/force';
import { sendMessage } from '../../domain/skyway/repository';
import { joinRoom } from '../../domain/skyway/room';
import { AppDispatch, RootState } from '../store';
import { createCommentNodeAction, createUserNodeAction } from './graphSlice';
import { addMessage } from './messageSlice';

const createMessage = (message: string) => ({
  id: uuidv4(),
  message,
  timestamp: new Date().toString(),
});

export const joinP2PRoomAction = createAsyncThunk<
  string | null | undefined,
  void,
  { dispatch: AppDispatch }
>('joinP2PRoomAction', async (_req, thunkAPI) => {
  try {
    const peerId = await joinRoom((messagePayload) => {
      const json = JSON.parse(messagePayload);
      const message = json.message;
      const force = getForce(message);
      simulator.addText({ text: message, position: { x: 200, y: 200 }, force });
      const msg = createMessage(message);
      thunkAPI.dispatch(addMessage(msg));
      thunkAPI.dispatch(createCommentNodeAction(json));
    });

    if (peerId) {
      await initDb();
      thunkAPI.dispatch(createUserNodeAction(peerId));
    }
    return peerId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
});
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
  const msg = createMessage(req);
  thunkAPI.dispatch(addMessage(msg));
  const state = thunkAPI.getState();
  if (!state.p2p.peerId) return;
  const messagePayload = { ...msg, peerId: state.p2p.peerId };
  sendMessage(JSON.stringify(messagePayload));
  thunkAPI.dispatch(createCommentNodeAction(messagePayload));
});
