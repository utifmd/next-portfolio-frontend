"use client"
import "boxicons"

import {BtnPrimary} from "../components/Button";
import {Surface} from "../components/sections";
import React from "react";
import Footer from "./Footer";
import Habits from "./Habits";
import Introduction from "./Introduction";
import Education from "./Education";
import Experience from "./Experience";
import QuickAction from "../components/sections/QuickAction";

export default function Home() {
    const intro = {
        title: "Who I am",
        description: "I am a self-taught generalist software engineer with strong passion to learn new things. I am familiar with a few Java, Kotlin android using android studio & Node JS frameworks as a cross mobile platform, and I also have developed backend API for a production system using native & framework. Currently I am interested and learning about Machine learning development using python. I also enjoy to play music on my spare time."
    }
    const habits = {
        title: "Stuff I do",
        description: "Some of the projects we are building include android mobile application, web application, multi platform development such as react by facebook and so on, but for now we are focusing on developing android applications.",
        data: [
            {"icon": "layout", "label": "Frontend"},
            {"icon": "server", "label": "Backend"},
            {"icon": "mobile-alt", "label": "Android"},
            {"icon": "devices", "label": "X-Platform"}
        ]
    }
    const education: IEducation = {
        content: "Ini content",
        createdAt: "A minute ago",
        desc: "Ini description",
        fileUrl: "",
        id: "",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    }
    const experience: IExperience = {
        createdAt: "asf",
        demoUrl: "ngdn",
        description: "xgf",
        iconUrl: "https://via.placeholder.com/150",
        id: "cnxvn",
        imageUrls: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
        platform: "xvmxgm",
        releasedUrl: "https://via.placeholder.com/150",
        stack: ["asdjk", "dfsdjgkz", "oash"],
        title: "sjsfj",
        type: "hjljl"

    }
    return (
        <main
            className="ease-linear transition-all duration-500 text-gray-700 dark:text-gray-300 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col h-screen text-center items-center uppercase">
                <div className="flex flex-col h-full px-0 sm:px-6 place-content-center place-items-center space-y-4">
                    <p className="text-3xl">Portfolio</p>
                    <div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/>
                    <p>A Little single page by Utif Milkedori</p>
                </div>
                <Surface><BtnPrimary label="Begin"/></Surface>
            </div>
            <div className="flex justify-center">
                <Surface>
                    <Introduction
                        title={intro.title}
                        description={intro.description}/>

                    <Habits
                        title={habits.title}
                        description={habits.description}
                        items={habits.data}/>

                    <Education data={education}/>

                    <Experience data={experience}/>

                    <QuickAction/>
                </Surface>
            </div>
            <Footer/>
        </main>
    )
}
