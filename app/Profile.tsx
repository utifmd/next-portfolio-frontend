import Image from "next/image";
import React from "react";
import Link from "next/link";
import Footer from "@/app/Footer";
import {capitalize} from "@/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";

const Profile = ({innerRef, profile}: TBoxProps & {profile: IProfile}) => <>
    <div ref={innerRef} className="flex justify-center w-full mt-24">
        <div className="w-full sm:w-[50%]">
            <figure className="flex flex-col sm:flex-row items-center p-0 sm:p-8 ">
                <div className="relative w-24 sm:w-[156px] h-24 sm:h-[112px]">
                    <Image className="rounded-full sm:rounded-xl mx-auto" src="https://via.placeholder.com/150" alt="profile picture"
                       style={{objectFit: "cover"}} fill={true} loader={() => "https://via.placeholder.com/150"} />
                </div>
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                        <p className="text-lg font-medium">“{capitalize(profile.bio)}.”</p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <Link className="text-green-600 cursor-pointerhover:opacity-70" href={"/authentication"}>
                            {capitalize(profile.fullName)}
                            <FontAwesomeIcon className="px-2" icon={faUnlockKeyhole} shake={true}/>
                        </Link>
                        <div className="text-slate-700 dark:text-slate-500">{capitalize(profile.jobTitle)}</div>
                    </figcaption>
                </div>
            </figure>
        </div>
    </div>
    <Footer urls={profile.links} />
</>
export default Profile