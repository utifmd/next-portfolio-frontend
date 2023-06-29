"use client"

import React, {useEffect, useRef} from "react";
import {StickyNavbar, Surface} from "@/components/sections";
import {ButtonPrimary} from "@/components/buttons";
import {Authenticated} from "./authentication"
import Habit from "./Habit";
import Introduction from "./Introduction";
import Profile from "./Profile";
import Feed from "./Feed";
import store from "@/store";
import {useAppSelector} from "@/app/hooks";

// type Props = IHomeState & {
//     authenticate?: any, signOut?: any, pagedFeed?: any, onSelectFeedItem?: any, onFeedStartedFalse?: any
// }
export default function Home() {
    const {feed, intro, habit, profile} = useAppSelector(state => state.home)
    const reference = useRef<any>({})
    const onRendered = () => {
        if(!feed.isStarted) return () => {}
        // authenticate?.()
        // pagedFeed?.()
        // onFeedStartedFalse?.()
    }
    useEffect(onRendered, [])
    const onFeedNextClicked = (feedLength: number, i: number) => (e: MouseEvent) => {
        e.preventDefault()
        if ((i + 1) >= feedLength) /*pagedFeed()*/
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
    const onLogoutClick = (e: any) => {
        e.preventDefault()
        /*signOut?.()*/
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative w-full">
                <Surface innerRef={handleBoxJumper("base")} innerClassName="absolute m-auto left-0 right-0 -top-24">
                    <ButtonPrimary label="Begin" onClick={onJumpToBox("intro")}/>
                </Surface>
            </div>
            <Authenticated>
                <StickyNavbar onLogoutClick={onLogoutClick}/>
            </Authenticated>
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
                    isLoading={feed.status === "loading"}
                    innerRef={handleBoxJumper("habit")}
                    onNextClick={onJumpToBox("feed")}/>
                <Feed
                    feedValues={feed.value}
                    isLoading={feed.status === "loading"}
                    isDone={feed.isDone}
                    onJumpToBox={onJumpToBox}
                    onFeedNextClicked={onFeedNextClicked}
                    onSelectItem={(i) => {}}
                    handleBoxJumper={handleBoxJumper}
                    innerRef={handleBoxJumper("feed")}/>
            </Surface>
            <Profile innerRef={handleBoxJumper("profile")} profile={profile} />
        </div>
    )
}