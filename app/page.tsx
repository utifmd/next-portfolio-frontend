"use client"
import {BtnPrimary} from "../components/Button";
import Surface from "../components/sections/Surface";
import Footer from "./Footer";
import React from "react";
import Introduction from "./Introduction";

export default function Home() {
    const habits = [
        { "icon": "android", "type": "logo", "label": "Android" },
        { "icon": "react", "type": "logo", "label": "X-Platform" },
        { "icon": "code-alt", "label": "Desktop"},
        { "icon": "globe", "label": "Web"},
        { "icon": "server", "label": "DevOps"},
        { "icon": "data", "label": "Backend"}
    ]
    return (
        <main className="ease-linear transition-all duration-500 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col h-screen text-center items-center uppercase">
                <div className="flex flex-col h-full place-content-center place-items-center space-y-4 ">
                    <p className="text-3xl">Portfolio</p>
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                    <p className="text-gray-200">A Little single page by Utif Milkedori</p>
                </div>
                <Surface><BtnPrimary label="Begin"/></Surface>
            </div>
            <div className="flex justify-center">
                <Surface>
                    <Introduction title="Judul disini" subtitle="Sub judul disini" habits={habits} />
                    {/*<div className="w-full bg-blue-400 p-2">
                        <p className="text-2xl">content 1</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolorem fuga quo, fugiat
                            culpa eum!
                            Adipisci maiores harum a quas eligendi dolore. Vitae asperiores ea, culpa facilis voluptates
                            earum
                            perferendis?</p>
                    </div>*/}
                </Surface>
            </div>
            <Footer/>
        </main>
    )
}
