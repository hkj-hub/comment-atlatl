import { LocalDataStream, LocalP2PRoomMember, RemoteDataStream, RoomPublication } from './types';

let stream: null | LocalDataStream = null;

export const getDataStream = async () => {
  if (!window) return null;
  const { SkyWayStreamFactory } = window.skyway_room;
  if (stream) return stream;
  stream = await SkyWayStreamFactory.createDataStream();
  return stream;
};
export const sendMessage = async (message: string) => {
  const dataStream = await getDataStream();
  console.log('send message', message);
  if (dataStream) dataStream.write(message);
};

export const subscribeAndAttach = async (
  publication: RoomPublication,
  me: LocalP2PRoomMember,
  handler: (data: string) => void,
) => {
  if (publication.publisher.id === me.id) return;
  const { stream } = await me.subscribe(publication.id);
  const dataStream = stream as RemoteDataStream;
  console.log('publication.publisher.id', publication.publisher.id);
  dataStream.onData.add((data) => {
    console.log('receive data', data);
    console.log('publisher.id', publication.publisher.id);
    handler(data.toString());
  });
};
