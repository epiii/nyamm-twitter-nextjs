import {
    BellIcon,
    BookmarkIcon,
    ClipboardListIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    HashtagIcon,
    HomeIcon,
    MailIcon,
    UserIcon
} from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import SidebarLink from './SidebarLink'

function Sidebar() {
    const { data: session } = useSession()
    console.log('data', session);

    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
                <Image
                    src="https://rb.gy/ogau5a"
                    width={30}
                    height={30}
                />
            </div>
            <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
                {/* <SidebarLink /> */}
                <SidebarLink text={"Home"} Icon={HomeIcon} active />
                <SidebarLink text={"Explore"} Icon={HashtagIcon} />
                <SidebarLink text={"Notifications"} Icon={BellIcon} />
                <SidebarLink text={"Messages"} Icon={MailIcon} />
                <SidebarLink text={"Bookmarks"} Icon={BookmarkIcon} />
                <SidebarLink text={"Lists"} Icon={ClipboardListIcon} />
                <SidebarLink text={"Profile"} Icon={UserIcon} />
                <SidebarLink text={"More"} Icon={DotsCircleHorizontalIcon} />
            </div>
            <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]'>Tweet</button>

            <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto" onClick={signOut}>
                <img
                    className="h-10 w-10 rounded-full xl:mr-2.5"
                    src={session.user.image}
                // src={'https://lh3.googleusercontent.com/a-/AOh14GibqVxtYcc34yKCz7dPp9_Txnzvdd5CUUdJyvNi=s96-c'}
                />
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session.user.name}</h4>
                    <p>@{session.user.tag}</p>
                </div>
                <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10 " />
            </div>
        </div>
    )
}
export default Sidebar