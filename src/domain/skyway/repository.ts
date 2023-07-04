// import {
//   LocalDataStream,
//   LocalP2PRoomMember,
//   RemoteDataStream,
//   RoomPublication,
//   SkyWayStreamFactory,
// } from '@skyway-sdk/room';

// let stream: null | LocalDataStream = null;

// export const getDataStream = async () => {
//   if (stream) return stream;
//   stream = await SkyWayStreamFactory.createDataStreama();
//   return stream;
// };
// export const sendMessage = async (message: string) => {
//   const dataStream = await getDataStream();
//   console.log('send message', message);
//   dataStream.write(message);
// };

// export const subscribeAndAttach = async (
//   publication: RoomPublication,
//   me: LocalP2PRoomMember,
//   handler: (data: string) => void,
// ) => {
//   if (publication.publisher.id === me.id) return;
//   const { stream } = await me.subscribe(publication.id);
//   const dataStream = stream as RemoteDataStream;
//   console.log('publication.publisher.id', publication.publisher.id);
//   dataStream.onData.add((data) => {
//     console.log('receive data', data);
//     console.log('publisher.id', publication.publisher.id);
//     handler(data.toString());
//   });
// };
