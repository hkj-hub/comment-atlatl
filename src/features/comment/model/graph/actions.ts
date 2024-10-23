import { createAsyncThunk } from '@reduxjs/toolkit';
import { graphSlice } from '@/entities/graph';
import { createCommentNode, createUserNode, getGraphdbCytoscape } from '../comment';
import type { MessagePaylad } from '@/entities/message';

export const createUserNodeAction = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>('createUserNodeAction', async (peerId, thunkAPI) => {
  await createUserNode(peerId);
  const graph = await getGraphdbCytoscape();
  thunkAPI.dispatch(graphSlice.actions.setGraph(graph));
});
export const createCommentNodeAction = createAsyncThunk<
  void,
  MessagePaylad,
  { dispatch: AppDispatch; state: RootState }
>('createCommentNodeAction', async (req, thunkAPI) => {
  await createCommentNode(req);
  const graph = await getGraphdbCytoscape();
  thunkAPI.dispatch(graphSlice.actions.setGraph(graph));
});
