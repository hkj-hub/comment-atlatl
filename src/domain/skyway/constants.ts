export const applicationToken = process.env.NEXT_PUBLIC_APPLICATION_TOKEN;
export const secretToken = process.env.NEXT_PUBLIC_SECRET_TOKEN;
const params = global.window == null ? undefined : new URLSearchParams(window.location.search);
export const roomName = params?.get('room') ?? 'lt';
export const authToken = params?.get('token') ?? '';
