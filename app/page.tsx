"use client"

import React from "react";
import {HomeContainer} from "@/containers/homeContainer";
export default function Main() {
    return (
        <main>
            <div className="flex flex-col h-screen px-0 sm:px-6 items-center text-center place-content-center space-y-4 uppercase">
                <p className="text-3xl">Portfolio</p>
                <div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/>
                <p>A Little single page by Utif Milkedori</p>
            </div>
            <HomeContainer/>
        </main>
    )
}