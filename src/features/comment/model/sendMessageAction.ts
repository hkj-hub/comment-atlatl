import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { addMessage } from '@/entities/message';
import { sendMessage } from '@/shared/domain/skyway/repository';
import { createCommentNodeAction } from './graph/actions';

const createMessage = (message: string) => ({
  id: uuidv4(),
  message,
  timestamp: new Date().toString(),
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
  const messagePayload = {
    ...msg,
    peerId: state.p2p.peerId,
    toCommentId: state.graphState.selectedId,
  };
  sendMessage(JSON.stringify(messagePayload));
  thunkAPI.dispatch(createCommentNodeAction(messagePayload));
});
