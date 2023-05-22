"use client"

import "boxicons"
import React, {useEffect, useRef} from "react";
import Habit from "./Habit";
import Introduction from "./Introduction";
import Profile from "./Profile";
import Footer from "./Footer";
import {QuickAction, Surface} from "../components/sections";
import {ButtonPrimary} from "../components/Button";
import {EducationItem} from "./education";
import {ExperienceItem} from "./experience";
import {TAppAction} from "../store";

type Props = IAppState & {
    morePagination: () => TAppAction
}
export default function Home(
    {feed, habit, intro, status, morePagination}: Props) {
    const reference = useRef({})

    const onFeedNextClicked = (
        feedLength: number, i: number) => (e: MouseEvent) => {
        e.preventDefault()
        if ((i + 1) >= feedLength) morePagination()
        onJumpToBox(i +1)()
    }
    const onJumpToBox = (key: string | number | undefined) => () => {
        reference.current[key]?.scrollIntoView({
            behavior: "smooth", top: 0
        })
    }
    useEffect(onJumpToBox(feed.scrollTo), [feed.scrollTo])

    const handleBoxJumper = (key: string | number) => (e) => {
        if (typeof key === "undefined") return
        reference.current[key] = e
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative w-full">
                <Surface innerRef={handleBoxJumper("base")} innerClassName="absolute m-auto left-0 right-0 -top-24">
                    <ButtonPrimary label="Begin" onClick={onJumpToBox("intro")}/>
                </Surface>
            </div>
            <QuickAction onLogoutClick={onJumpToBox("profile")}/>
            <Surface>
                <Introduction
                    title={intro.title}
                    description={intro.description}
                    innerRef={handleBoxJumper("intro")}
                    onNextClick={onJumpToBox("habit")}/>

                <Habit
                    title={habit.title}
                    items={habit.data}
                    description={habit.description}
                    innerRef={handleBoxJumper("habit")}
                    onNextClick={onJumpToBox(0)}/>

                {feed.value.map((item, i) => "content" in item
                    ? <EducationItem
                        key={i}
                        innerRef={handleBoxJumper(i)}
                        education={item as IEducation}
                        isLoading={status === "loading" && (i + 1) >= feed.value.length}
                        onNextClick={onFeedNextClicked(feed.value.length, i)}/>

                    : <ExperienceItem
                        key={i}
                        innerRef={handleBoxJumper(i)}
                        experience={item as IExperience}
                        isLoading={status === "loading" && (i + 1) >= feed.value.length}
                        onNextClick={onFeedNextClicked(feed.value.length, i)}
                        onBottomClick={feed.isDone && (i + 1) >= feed.value.length && onJumpToBox("base")}/>
                )}
            </Surface>
            <Profile innerRef={handleBoxJumper("profile")} />
            <Footer />
        </div>
    )
}