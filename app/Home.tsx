"use client"

import "boxicons"
import React, {useEffect, useState} from "react";
import Habit from "./Habit";
import Introduction from "./Introduction";
import {QuickAction, Surface} from "../components/sections";
import {EducationItem} from "./Education";
import {ExperienceItem} from "./Experience";
import {PAGINATION_SIZE, pagedFeed} from "../actions";
import {useAppDispatch, useAppSelector} from "./hooks";

const Home = () => {
    const {intro, habit, feed} = useAppSelector(({home}) => home as IAppState)
    const dispatch = useAppDispatch()
    const [feedPage, setFeedPage] = useState<number>(1)

    const onPaginationFeed = () => {
        dispatch(pagedFeed(feedPage))
        setFeedPage(feedPage +1)
    }

    useEffect(() => {
        onPaginationFeed()

    }, [pagedFeed])

    const onHomeClicked = (e: MouseEvent) => {
        e.preventDefault()
        onPaginationFeed()
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