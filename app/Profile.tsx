import React from "react";
import Link from "next/link";
import Footer from "./Footer";
import {capitalize} from "@/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "@/app/hooks";
import {Image} from "../components"
type Props = TBoxProps & {profileState: IProfileState}
const Profile = ({innerRef, profileState}: Props) => {
    const homeState = useAppSelector(state => state.home)
    return(<>
        <div ref={innerRef} className="flex justify-center w-full mt-24">
            <div className="w-full sm:w-[50%]">
                <figure className="flex flex-col sm:flex-row items-center p-0 sm:p-8 ">
                    <div className="relative w-24 sm:w-[156px] h-24 sm:h-[112px]">
                        <Image className="rounded-full object-cover sm:rounded-xl mx-auto"
                            alt="profile picture"
                            source={profileState.value?.imageUrl}/>
                    </div>
                    <div className="p-6 md:p-8 text-center md:text-left space-y-4">
                        <blockquote>
                            <p className="text-lg font-medium">“{capitalize(profileState.value?.bio)}.”</p>
                        </blockquote>
                        <figcaption className="font-medium">
                            <Link className="group text-green-600 cursor-pointer" href={"/authentication"}>
                                <FontAwesomeIcon className="px-1 hidden group-hover:inline" icon={faSignIn} shake={true} />
                                {capitalize(profileState.value?.fullName)}
                            </Link>
                            <div className="text-slate-700 dark:text-slate-500">{capitalize(profileState.value?.jobTitle)}</div>
                        </figcaption>
                    </div>
                </figure>
            </div>
        </div>
        {homeState.status === "loading" &&
            <FontAwesomeIcon color={"#059669"} icon={faSpinner} spin={true} size="2x" />}

        {homeState.message &&
            <p className="text-center pt-6 px-6 text-red-500 text-sm italic">{homeState.message}</p>}

        {profileState.value?.links &&
            <Footer urls={profileState.value?.links}/>}
    </>)
}
export default Profile