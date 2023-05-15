"use client"

import "boxicons"
import Habit from "./Habit";
import Introduction from "./Introduction";
import {EducationContainer, ExperienceContainer} from "../containers"
import {Surface, QuickAction} from "../components/sections";
import {useAppSelector} from "./hooks";

export default function Main() {
    const {intro, habit}: IAppState = useAppSelector(({home}) => home)
    return (
        <div className="flex justify-center">
            <Surface>
                <Introduction
                    title={intro.title}
                    description={intro.description}/>

                <Habit
                    title={habit.title}
                    description={habit.description}
                    items={habit.data}/>

                <EducationContainer/>

                <ExperienceContainer/>

                <QuickAction/>
            </Surface>
        </div>
    )
}
