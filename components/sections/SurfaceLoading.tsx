import React from "react";
import {Surface} from "@/components/sections/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function () {
    return(
        <div className="flex justify-center items-center">
            <div className="relative w-full">
                <Surface innerClassName="absolute m-auto left-0 right-0 -top-24">
                    <div className="w-[75%] sm:w-[50%] py-4 uppercase font-bold bg-gray-300 dark:bg-gray-700 text-gray">
                        <div className="flex justify-center items-center space-x-3">
                            <FontAwesomeIcon color="gray" icon={faSpinner} spin={true} />
                            <div className="px-3 truncate">Please wait..</div>
                        </div>
                    </div>
                </Surface>
            </div>
        </div>
    )
}