import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "../context/context";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider>
      <SessionProvider
        session={session}
        refetchInterval={3 * 60}
        refetchOnWindowFocus={true}
      >
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
