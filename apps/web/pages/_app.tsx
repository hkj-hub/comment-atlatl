import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import '@/app/globals.css';

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
