"use client"

import React, {useEffect, useRef} from "react";
import {StickyNavbar, Surface} from "@/components/sections";
import {ButtonPrimary} from "@/components/buttons";
import {Authenticated} from "./authentication"
import Habit from "./Habit";
import Introduction from "./Introduction";
import Profile from "./Profile";
import Feed from "./Feed";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {onSelectFeedItem, pagedFeed} from "@/actions/homeAction";
import {signOut} from "@/actions/authenticationAction";

export default function Home({feed, intro, habit, profile}: IHomeState) {
    const reference = useRef<any>({})
    const feedState = useAppSelector(state => state.home.feed)
    const dispatch = useAppDispatch()
    const onFeedNextClicked = (feedLength: number, i: number) => (e: MouseEvent) => {
        e.preventDefault()
        if ((i + 1) >= feedLength) dispatch(pagedFeed())
        onJumpToBox(i +1)()
    }
    const onJumpToBox = (key?: string | number) => () => {
        key && reference.current[key]?.scrollIntoView({behavior: "smooth"})
    }
    useEffect(onJumpToBox(feedState.scrollTo), [feedState.scrollTo])

    const handleBoxJumper = (key: string | number) => (e: any) => {
        if (typeof key === "undefined") return
        reference.current[key] = e
    }
    const onLogoutClick = (e: any) => {
        e.preventDefault()
        dispatch(signOut())
    }
    const handleOnSelectFeedItem = (i: number) => {
        dispatch(onSelectFeedItem(i))
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
                    isLoading={feedState.status === "loading"}
                    innerRef={handleBoxJumper("habit")}
                    onNextClick={onJumpToBox("feed")}/>
                <Feed
                    feedValues={feedState.value.length ? feedState.value : feed.value}
                    isLoading={feedState.status === "loading"}
                    isDone={feedState.isDone}
                    onJumpToBox={onJumpToBox}
                    onFeedNextClicked={onFeedNextClicked}
                    onSelectItem={handleOnSelectFeedItem}
                    handleBoxJumper={handleBoxJumper}
                    innerRef={handleBoxJumper("feed")}/>
            </Surface>
            <Profile innerRef={handleBoxJumper("profile")} profile={profile} />
        </div>
    )
}