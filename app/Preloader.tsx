"use client"

import {onFeedStartedFalse, pagedFeed} from "@/actions/homeAction";
import {authenticate} from "@/actions/authenticationAction";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useEffect} from "react";
export default function ({initialFeed}:{initialFeed: ISchema[]}) {
    const {isStarted} = useAppSelector(state => state.home.feed)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isStarted) {
            dispatch(authenticate())
            dispatch(pagedFeed(initialFeed))
            dispatch(onFeedStartedFalse())
        }
    }, [])
    return null
}