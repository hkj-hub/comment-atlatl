import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage } from '@/entities/message';
import { p2pSlice, joinRoom } from '@/entities/p2p';
import { simulator, getForce } from '@/entities/simulator';

export const joinP2PRoomActionForSimulator = createAsyncThunk<
  string | null | undefined,
  void,
  { dispatch: AppDispatch }
>('joinP2PRoomActionForSimulator', async (_req, thunkAPI) => {
  try {
    const peerId = await joinRoom((messagePayload) => {
      const json = JSON.parse(messagePayload);
      const message = json.message;
      const force = getForce(message);
      simulator.addText({ text: message, position: { x: 200, y: 200 }, force });

      thunkAPI.dispatch(addMessage(json));
    });

    thunkAPI.dispatch(p2pSlice.actions.setPeerId(peerId));
    return peerId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
});
