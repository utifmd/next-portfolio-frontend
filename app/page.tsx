"use client"
import "boxicons"

import {Surface, QuickAction} from "../components/sections";
import React from "react";
import Habit from "./Habit";
import Introduction from "./Introduction";
import Experience from "./Experience";
import EducationContainer from "../containers/EducationContainer";

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
        <div className="flex justify-center">
            <Surface>
                <Introduction
                    title={intro.title}
                    description={intro.description}/>

                <Habit
                    title={habits.title}
                    description={habits.description}
                    items={habits.data}/>

                <EducationContainer />

                <Experience data={experience}/>

                <QuickAction/>
            </Surface>
        </div>
    )
}
