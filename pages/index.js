import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Nyamm Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        {/* widgets */}
        {/* modal */}
      </main>
    </div>
  )
}
