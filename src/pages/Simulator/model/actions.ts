import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage } from '@/entities/message';
import { p2pSlice } from '@/entities/p2p/p2pSlice';
import { initDb, createCommentNodeAction, createUserNodeAction } from '@/features/comment';
import { simulator } from '@/shared/domain/simulator';
import { getForce } from '@/shared/domain/simulator/force';
import { joinRoom } from '@/shared/domain/skyway/room';

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
      console.log('json', json);
      thunkAPI.dispatch(addMessage(json));
      thunkAPI.dispatch(createCommentNodeAction(json));
    });

    if (peerId) {
      await initDb();
      // 自分という特別ユーザーを作成
      thunkAPI.dispatch(createUserNodeAction(peerId));
    }
    thunkAPI.dispatch(p2pSlice.actions.setPeerId(peerId));
    return peerId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
});
