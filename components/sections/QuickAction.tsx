import Link from "next/link";

const QuickAction = ({onLogoutClick}: {onLogoutClick: (e: MouseEvent) => void}) => {
    return(<div className="relative sticky top-0 z-10 w-full shadow-lg sm:w-[50%]">
        <div className="flex py-3 px-4 justify-between backdrop-blur-sm">{/* bg-white/50*/}
            <div className="flex">
                <Link href={"/experience"} className="px-1.5 cursor-pointer text-center group hover:opacity-70">
                    <box-icon name="briefcase" color="#059669"/>
                    <p className="text-green-600 drop-shadow-[0_1.2px_1.2px_rgb(255,255,255)] dark:drop-shadow-[0_1.2px_1.2px_rgb(0,0,0)]">Experience</p>
                </Link>
                <Link href={"/education"} className="px-1.5 cursor-pointer text-center group hover:opacity-70">
                    <box-icon name="credit-card-front" color="#059669"/>
                    <p className="text-green-600 drop-shadow-[0_1.2px_1.2px_rgb(255,255,255)] dark:drop-shadow-[0_1.2px_1.2px_rgb(0,0,0)]">Education</p>
                </Link>
            </div>
            <div>
                <button onClick={onLogoutClick} className="px-1.5 cursor-pointer text-center group hover:opacity-70">
                    <box-icon name="log-out" color="#059669"/>
                    <p className="text-green-600 drop-shadow-[0_1.2px_1.2px_rgb(255,255,255)] dark:drop-shadow-[0_1.2px_1.2px_rgb(0,0,0)]">Log out</p>
                </button>
            </div>
        </div>
    </div>)
}
export default QuickAction