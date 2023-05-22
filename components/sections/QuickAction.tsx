import Link from "next/link";

const QuickAction = ({onLogoutClick}:{onLogoutClick: (e: MouseEvent) => void}) => {
    return(<div className="relative sticky top-0 z-10 w-full shadow-lg sm:w-[50%]">
        <div className="flex py-3 px-4 justify-between bg-green-600">
            <div className="flex">
                <Link href={"/experience"} className="px-1.5 cursor-pointer text-center group hover:opacity-70">
                    <box-icon name="briefcase" color="#F2F2F2"/>
                    <p className="text-white">Experience</p>
                </Link>
                <Link href={"/education"} className="px-1.5 cursor-pointer text-center group hover:opacity-70">
                    <box-icon name="credit-card-front" color="#F2F2F2"/>
                    <p className="text-white">Education</p>
                </Link>
            </div>
            <div>
                <button onClick={onLogoutClick} className="px-1.5 cursor-pointer text-center group hover:opacity-70">
                    <box-icon name="log-out" color="#F2F2F2"/>
                    <p className="text-white">Log out</p>
                </button>
            </div>
        </div>
    </div>)
}
export default QuickAction