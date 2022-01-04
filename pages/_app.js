import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // console.log('pageProps', pageProps);
  // console.log('session', session);
  // console.log('SessionProvider', SessionProvider);
  // return false
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

