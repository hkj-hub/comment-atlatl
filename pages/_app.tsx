/* eslint-disable @conarti/feature-sliced/layers-slices */
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { joinP2PRoomAction } from '@/pages/Simulator';

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
