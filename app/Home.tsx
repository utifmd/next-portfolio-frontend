"use client"

import "boxicons"
import React, {useEffect, useState} from "react";
import Habit from "./Habit";
import Introduction from "./Introduction";
import {QuickAction, Surface} from "../components/sections";
import {EducationItem} from "./Education";
import {ExperienceItem} from "./Experience";
import {pagedFeed} from "../actions";
import {useAppDispatch, useAppSelector} from "./hooks";

export default function Home() {
    const dispatch = useAppDispatch()
    const {intro, habit, feed} = useAppSelector(({home}) => home as IAppState)
    const [feedPage, setFeedPage] = useState<number>(1)

    useEffect(onPaginationFeed, [pagedFeed])

    function onPaginationFeed() {
        dispatch(pagedFeed(feedPage))
        setFeedPage(feedPage +1)
    }
    const onEducationNextClicked = (e: MouseEvent) =>
        (educationLength: number, i: number) => {
        e.preventDefault()

        if((i +1) < educationLength) return // the rest of data
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

                {feed.map((item, i) => "content" in item
                    ? <EducationItem
                        education={item as IEducation}
                        onClicked={e => onEducationNextClicked(e)(feed.length, i)}/>
                    : <ExperienceItem experience={item as IExperience}/>
                )}
                <QuickAction/>
            </Surface>
        </div>
    )
}