/* eslint-disable no-var */

// 通常通りimportするとnext.jsのSSRで 「RTCPeerConnection is not defined」のエラーが出るため、
// CDNからのインポートで回避している。このとき、window.skyway_roomにパーツがはいる
import type {
  StreamFactory,
  SkyWayContext,
  LocalDataStream,
  LocalP2PRoomMember,
  RemoteDataStream,
  RoomPublication,
  P2PRoom,
  SfuRoom,
  RoomInit,
} from '@skyway-sdk/room';

export type {
  LocalDataStream,
  LocalP2PRoomMember,
  RemoteDataStream,
  RoomPublication,
  StreamFactory,
  SkyWayContext,
};

// import/exportがある場合はdeclare global内に書く
declare global {
  // letやconstにはしない。letやconstにするとグローバル変数にならない
  var skyway_room: {
    SkyWayStreamFactory: StreamFactory;
    SkyWayContext: { Create: (token: string) => Promise<SkyWayContext> };
    SkyWayRoom: {
      FindOrCreate: <Init extends RoomInit>(
        context: SkyWayContext,
        init: Init,
      ) => Promise<Init['type'] extends 'p2p' ? P2PRoom : SfuRoom>;
    };
    SkyWayAuthToken: string;
    uuidV4: string;
    nowInSec: string;
  };
}
