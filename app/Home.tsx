"use client"

import "boxicons"
import React, {useEffect} from "react";
import Habit from "./Habit";
import Introduction from "./Introduction";
import {QuickAction, Surface} from "../components/sections";
import {EducationItem} from "./Education";
import {ExperienceItem} from "./Experience";
import {getFeed, pagedFeed, addFeed} from "../actions";
import {useAppDispatch, useAppSelector} from "./hooks";

const Home = () => {
    const {intro, habit, feed} = useAppSelector(({home}) => home as IAppState)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(pagedFeed())

    }, [pagedFeed])

    const onHomeClicked = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(pagedFeed())
    }
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

                {feed.map((item) => "content" in item
                    ? <EducationItem education={item as IEducation}/>
                    : <ExperienceItem experience={item as IExperience}/>
                )}
                <QuickAction onHomeClicked={onHomeClicked}/>
            </Surface>
        </div>
    )
}
export default Home