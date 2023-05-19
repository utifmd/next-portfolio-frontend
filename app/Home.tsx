"use client"

import "boxicons"
import React, {useEffect, useState, useRef} from "react";
import Habit from "./Habit";
import Introduction from "./Introduction";
import {QuickAction, Surface} from "../components/sections";
import {EducationItem} from "./Education";
import {ExperienceItem} from "./Experience";
import {pagedFeed} from "../actions";
import {educationsData, experiencesData} from "../store"
import {useAppDispatch, useAppSelector} from "./hooks";
import {ButtonPrimary} from "../components/Button";
/*
* TODO:
* - [x]. placing the paging state
* - [ ]. testing with another page size
* */
export default function Home() {
    const reference = useRef({})
    const dispatch = useAppDispatch()
    const {intro, habit, feed, status} = useAppSelector(root => root.home)

    useEffect(onPaginationFeed, [pagedFeed])

    function onPaginationFeed() {
        dispatch(pagedFeed())
    }
    const onFeedNextClicked = (
        feedLength: number, i: number) => (e: MouseEvent) => {
        e.preventDefault()
        if ((i + 1) >= feedLength) onPaginationFeed()
        onJumpToBox(i +1)()
    }
    const onJumpToBox = (key: string | number) => () => {
        console.log(`jump to key ${key}`)
        reference.current[key]?.scrollIntoView({
            behavior: "smooth", top: 0
        })
    }
    const handleBoxJumper = (key: string | number) => (e) => {
        reference.current[key] = e
    }
    return (
        <div ref={handleBoxJumper("top")} className="flex flex-col justify-center items-center">
            <div className="relative w-full">
                <Surface innerClassName="absolute m-auto left-0 right-0 -top-24">
                    <ButtonPrimary label="Begin" onClick={onJumpToBox("intro")}/>
                </Surface>
            </div>
            <Surface>
                <Introduction
                    title={intro.title}
                    description={intro.description}
                    innerRef={handleBoxJumper("intro")}
                    onClick={onJumpToBox("habit")}/>

                <Habit
                    title={habit.title}
                    items={habit.data}
                    description={habit.description}
                    innerRef={handleBoxJumper("habit")} onClick={onJumpToBox(0)}/>

                {feed.value.map((item, i) => "content" in item
                    ? <EducationItem
                        key={i}
                        innerRef={handleBoxJumper(i)}
                        education={item as IEducation}
                        isLoading={status === "request" && (i + 1) >= feed.value.length}
                        onClick={onFeedNextClicked(feed.value.length, i)}/>

                    : <ExperienceItem
                        key={i}
                        innerRef={handleBoxJumper(i)}
                        experience={item as IExperience}
                        isLoading={status === "request" && (i + 1) >= feed.value.length}
                        isBottom={feed.isDone && (i + 1) >= feed.value.length}
                        onClick={onFeedNextClicked(feed.value.length, i)}/>
                )}
                <QuickAction onHomeClicked={onJumpToBox("top")}/>
            </Surface>
        </div>
    )
}