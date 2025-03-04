import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage } from '@/entities/message';
import { p2pSlice, joinRoom } from '@/entities/p2p';
import { initDb, createCommentNodeAction, createUserNodeAction } from '@/features/comment';

export const joinP2PRoomActionForGraph = createAsyncThunk<
  string | null | undefined,
  void,
  { dispatch: AppDispatch }
>('joinP2PRoomActionForGraph', async (_req, thunkAPI) => {
  try {
    const peerId = await joinRoom((messagePayload) => {
      const json = JSON.parse(messagePayload);

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
