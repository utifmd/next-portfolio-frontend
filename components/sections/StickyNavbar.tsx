import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faUniversity, faSignOut, faUser} from "@fortawesome/free-solid-svg-icons";

const StickyNavbar = ({onLogoutClick}: {onLogoutClick: (e: any) => void}) => {
    return(<div className="sticky top-0 z-10 w-full shadow-md sm:w-[50%]">
        <div className="flex py-3 px-4 justify-between bg-white/40 dark:bg-black/40 text-black dark:text-white backdrop-blur-md">{ /* bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800*/}
            <div className="flex">
                <Link href={"/profile"} className="px-1.5 text-green-700 dark:text-green-300 cursor-pointer text-center group hover:opacity-70">
                    <FontAwesomeIcon className="drop-shadow-md" icon={faUser} />
                    <p className="drop-shadow-md">Profile</p>
                </Link>
                <Link href={"/experience"} className="px-1.5 text-green-700 dark:text-green-300 cursor-pointer text-center group hover:opacity-70">
                    <FontAwesomeIcon className="drop-shadow-md" icon={faBriefcase} />
                    <p className="drop-shadow-md">Experience</p>
                </Link>
                <Link href={"/education"} className="px-1.5 text-green-700 dark:text-green-300 cursor-pointer text-center group hover:opacity-70">
                    <FontAwesomeIcon className="drop-shadow-md" icon={faUniversity} />
                    <p className="drop-shadow-md">Education</p>
                </Link>
            </div>
            <div>
                <button onClick={onLogoutClick} className="px-1.5 text-green-700 dark:text-green-300 cursor-pointer text-center group hover:opacity-70">
                    <FontAwesomeIcon className="drop-shadow-md" icon={faSignOut} />
                    <p className="drop-shadow-md">Log out</p>
                </button>
            </div>
        </div>
    </div>)
}
export default StickyNavbar