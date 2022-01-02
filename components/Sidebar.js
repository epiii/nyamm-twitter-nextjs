import Image from 'next/image'
import React from 'react'
import SidebarLink from './SidebarLink'
import { BellIcon, HashtagIcon, HomeIcon } from '@heroicons/react/solid'

function Sidebar() {
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
            </div>

        </div>
    )
}

export default Sidebar
