import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
export type Message = { timestamp: string; message: string; id: string };
// メッセージエンティティアダプターを作成
export const messageAdapter = createEntityAdapter<Message>({
  selectId: (a) => a.id,
  // メッセージエンティティのソート基準としてtimestampを使用。降順
  sortComparer: (a, b) => b.timestamp.localeCompare(a.timestamp),
});

// 初期状態を設定
const initialState = messageAdapter.getInitialState();

// メッセージスライスを作成
export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // メッセージを追加するためのアクション
    addMessage: messageAdapter.addOne,
    // メッセージを一括追加するためのアクション
    addMessages: messageAdapter.addMany,
    // メッセージを更新するためのアクション
    updateMessage: messageAdapter.updateOne,
    // メッセージを削除するためのアクション
    deleteMessage: messageAdapter.removeOne,
    // 複数のメッセージを削除するためのアクション
    deleteMessages: messageAdapter.removeMany,
  },
});

// アクションクリエーターをエクスポート
export const { addMessage, addMessages, updateMessage, deleteMessage, deleteMessages } =
  messageSlice.actions;

// リデューサーをエクスポート
export default messageSlice.reducer;
