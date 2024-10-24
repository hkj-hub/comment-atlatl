const params = global.window == null ? undefined : new URLSearchParams(window.location.search);
export const roomName = params?.get('room') ?? 'lt';
export const authToken = params?.get('token') ?? '';
