import Image from "next/image";
import React from "react";
import Link from "next/link";

const Profile = ({innerRef}: TBoxProps) =>
    <div ref={innerRef} className="flex justify-center w-full mt-24">
        <div className="w-full sm:w-[50%]">
            <figure className="flex flex-col sm:flex-row items-center p-0 sm:p-8 ">{/*rounded-xl bg-slate-100 dark:bg-slate-800*/}
                <div className="relative w-24 sm:w-[512px] h-24 sm:h-[256px]">
                    <Image
                        className="rounded-full sm:rounded-xl mx-auto" objectFit="cover" layout="fill"
                        src="https://via.placeholder.com/150"
                        loader={() => "https://via.placeholder.com/150"} alt="apabila"/>
                </div>
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                        <p className="text-lg font-medium">
                            “Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny.”
                        </p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <Link className="text-green-600 cursor-pointer hover:opacity-70" href={"/authentication"}>
                            Sarah Dayan
                        </Link>
                        <div className="text-slate-700 dark:text-slate-500">
                            Staff Engineer, Algolia
                        </div>
                    </figcaption>
                </div>
            </figure>
        </div>
    </div>
export default Profile