import Image from "next/image";
import React from "react";
import Link from "next/link";
import Footer from "./Footer";
import {capitalize} from "@/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "@/app/hooks";
import Loading from "@/components/sections/Loading";

const Profile = ({innerRef, profile}: TBoxProps & {profile: IProfile}) => {
    const {status, message} = useAppSelector(state => state.authentication)
    return(<>
        <div ref={innerRef} className="flex justify-center w-full mt-24">
            <div className="w-full sm:w-[50%]">
                <figure className="flex flex-col sm:flex-row items-center p-0 sm:p-8 ">
                    <div className="relative w-24 sm:w-[156px] h-24 sm:h-[112px]">
                        <Image className="rounded-full object-cover sm:rounded-xl mx-auto" src="https://via.placeholder.com/150" alt="profile picture"
                               fill={true} loader={() => "https://via.placeholder.com/150"} />
                    </div>
                    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                        <blockquote>
                            <p className="text-lg font-medium">“{capitalize(profile.bio)}.”</p>
                        </blockquote>
                        <figcaption className="font-medium">
                            <Link className="group text-green-600 cursor-pointer" href={"/authentication"}>
                                {capitalize(profile.fullName)}
                                <FontAwesomeIcon className="px-1 opacity-0 group-hover:opacity-100" icon={faSignIn} shake={true} />
                            </Link>
                            <div className="text-slate-700 dark:text-slate-500">{capitalize(profile.jobTitle)}</div>
                        </figcaption>
                    </div>
                </figure>
            </div>
        </div>
        {status === "loading" && <FontAwesomeIcon color={"#059669"} icon={faSpinner} spin={true} size={"2x"} />}
        {message && <p className="text-center pt-6 px-6 text-red-500 text-sm italic">{message}</p>}
        <Footer urls={profile.links} />
    </>)
}
export default Profile