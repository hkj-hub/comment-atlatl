import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { joinP2PRoomAction } from '../store/slices/p2pSlice';
import { store } from '../store/store';
if (global.window) {
  store.dispatch(joinP2PRoomAction());
}
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <script
        async
        src="https://cdn.jsdelivr.net/npm/@skyway-sdk/room/dist/skyway_room-latest.js"
      ></script>
    </>
  );
}
