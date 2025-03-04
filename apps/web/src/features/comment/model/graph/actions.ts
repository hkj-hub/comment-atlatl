import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCommentNode, createUserNode, getGraphdbCytoscape } from '../comment';
import { loadComment, saveComment } from '../comment/persistence';
import type { MessagePaylad } from '@/entities/message';
import { graphSlice } from '@/entities/graph';

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

export const saveCommentNodeAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('saveCommentNodeAction', async () => {
  await saveComment();
});
export const loadCommentNodeAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('loadCommentNodeAction', async (_, thunkAPI) => {
  await loadComment();
  const graph = await getGraphdbCytoscape();
  thunkAPI.dispatch(graphSlice.actions.setGraph(graph));
});
