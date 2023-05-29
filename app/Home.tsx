"use client"

import Habit from "./Habit";
import Introduction from "./Introduction";
import Profile from "./Profile";
import Footer from "./Footer";
import Feed from "./Feed";
import React, {useEffect, useRef} from "react";
import {StickyNavbar, Surface} from "../components/sections";
import {ButtonPrimary} from "@/components/Button";

type Props = IHomeState & {
    morePagination: any
}
export default function Home({feed, intro, habit, profile, morePagination}: Props) {
    const reference = useRef<Record<string, any>>({})
    const onFeedNextClicked = (feedLength: number, i: number) => (e: MouseEvent) => {
        e.preventDefault()
        if ((i + 1) >= feedLength) morePagination()
        onJumpToBox(i +1)()
    }
    const onJumpToBox = (key?: string | number) => () => {
        key && reference.current[key]?.scrollIntoView({behavior: "smooth"})
    }
    useEffect(onJumpToBox(feed.scrollTo), [feed.scrollTo])

    const handleBoxJumper = (key: string | number) => (e: any) => {
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
            <StickyNavbar onLogoutClick={onJumpToBox("profile")}/>
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
                    onNextClick={onJumpToBox("feed")}/>
                <Feed
                    feedValues={feed.value}
                    isLoading={feed.status === "loading"}
                    isDone={feed.isDone}
                    onJumpToBox={onJumpToBox}
                    onFeedNextClicked={onFeedNextClicked}
                    handleBoxJumper={handleBoxJumper}
                    innerRef={handleBoxJumper("feed")}/>
            </Surface>
            <Profile innerRef={handleBoxJumper("profile")} profile={profile} />
        </div>
    )
}