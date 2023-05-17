import React from "react";

const Surface = (
    {children, innerClassName}: {children: React.ReactNode, innerClassName?: string}) =>
<div
    className={`flex flex-col ring-1 ring-gray-900/5 shadow-inner-lg items-center w-full sm:w-[50%] px-2.5 py-5 space-y-10 bg-gray-200 dark:bg-gray-800 animate-fade-in-down ${innerClassName}`}> {/* bg-gradient-to-tl from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800*/}
    {children}
</div>
export default Surface