/* eslint-disable sonarjs/new-cap */
import { roomName } from './constants';
import { getDataStream, subscribeAndAttach } from './repository';
import { getToken } from './token';

export const joinRoom = async (
  receiveHandler: (s: string) => void,
  token = getToken(),
  name = roomName,
) => {
  // トークンがないときはSkyWayに繋がない
  if (!token) return null;
  // 既に開いているデータストリームへ再度アタッチすることはできない
  const dataStream = await getDataStream();
  if (!dataStream || dataStream.published) return null;

  console.log('token', token);

  // SSRの時にwindowにアクセスするとエラーになるのでブロック
  if (!window) return null;
  const { SkyWayContext, SkyWayRoom } = window.skyway_room;
  const context = await SkyWayContext.Create(token);
  const room = await SkyWayRoom.FindOrCreate(context, { type: 'p2p', name });
  const me = await room.join();

  // 自分のデータを publish する
  me.publish(dataStream);

  // 相手のデータをsubscribeする
  console.log(room.publications);
  room.publications.forEach((pub) => {
    subscribeAndAttach(pub, me, receiveHandler);
  });
  room.onStreamPublished.add((e) => {
    subscribeAndAttach(e.publication, me, receiveHandler);
  });
  room.onMemberJoined.add((e) => {
    console.log(e.member);
  });

  return me.id;
};
