import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { createCommentNode, createUserNode, getGraphdbCytoscape } from '@/domain/comment';
import { MessagePaylad } from './messageSlice';
import type { AppDispatch, RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

export type GraphDataFromKuzu = {
  data: {
    id?: string;
    source?: string;
    target?: string;
    label?: string;
    type: string;
    peerId?: string;
  };
};
interface State {
  graph: GraphDataFromKuzu[];
  selectedId: string | null;
}

const initialState: State = {
  graph: [],
  selectedId: null,
};

export const graphSlice = createSlice({
  name: 'graphState',
  initialState,
  reducers: {
    setGraph: (state, action: PayloadAction<GraphDataFromKuzu[]>) => {
      state.graph = action.payload;
    },
    setSelectedId: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
  },
});

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

const stateSelector = (state: RootState) => state[graphSlice.reducerPath];

export const graphSelector = createSelector(stateSelector, (c) => {
  return c.graph;
});
