// import { nowInSec, SkyWayAuthToken, uuidV4 } from '@skyway-sdk/room';
// import { applicationToken, authToken, secretToken } from './constants';

// export const getToken = () => {
//   if (authToken) return authToken;
//   const token = new SkyWayAuthToken({
//     jti: uuidV4(),
//     iat: nowInSec(),
//     exp: nowInSec() + 60 * 60 * 24,
//     scope: {
//       app: {
//         id: `${applicationToken}`,
//         turn: true,
//         actions: ['read'],
//         channels: [
//           {
//             id: '*',
//             name: '*',
//             actions: ['write'],
//             members: [
//               {
//                 id: '*',
//                 name: '*',
//                 actions: ['write'],
//                 publication: {
//                   actions: ['write'],
//                 },
//                 subscription: {
//                   actions: ['write'],
//                 },
//               },
//             ],
//             sfuBots: [
//               {
//                 actions: ['write'],
//                 forwardings: [
//                   {
//                     actions: ['write'],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     },
//   }).encode(`${secretToken}`);
//   return token;
// };
