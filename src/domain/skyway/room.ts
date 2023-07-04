import { SkyWayContext, SkyWayRoom } from '@skyway-sdk/room';
import { roomName } from './constants';
import { getToken } from './token';
import { getDataStream, subscribeAndAttach } from './repository';

export const joinRoom = async (
  receiveHandler: (s: string) => void,
  token = getToken(),
  name = roomName,
) => {
  // 既に開いているデータストリームへ再度アタッチすることはできない
  const dataStream = await getDataStream();
  if (dataStream.published) return null;

  console.log('token', token);
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
