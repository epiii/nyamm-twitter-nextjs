import Head from 'next/head'
import Feeds from '../components/Feeds'
import Sidebar from '../components/Sidebar'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Login from '../components/Login'

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()
  console.log('trending', trendingResults);
  console.log('follw', followResults);
  console.log('prov', providers);
  console.log('sess', session);

  // if (!session) return <Login providers={providers} />

  return (
    <div className="">
      <Head>
        <title>Nyamm Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feeds />
        {/* {session.user.name} */}
        {/* widgets */}
        {/* modal */}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then((res) => res.json())
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then((res) => res.json())
  const providers = await getProviders()
  const session = await getSession(context)

  console.log('context', context);
  // return false

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session
    }
  }
}