"use client"

import {onFeedStartedFalse, pagedFeed} from "@/actions/homeAction";
import {authenticate} from "@/actions/authenticationAction";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useEffect} from "react";
import {getProfile} from "@/actions/profileAction";
type Props = {
    initialFeed: IFeedState,
    initialProfile: ISchema,
}
export default function ({initialFeed, initialProfile}: Props) {
    const {isStarted} = useAppSelector(state => state.home.feed)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isStarted) {
            dispatch(authenticate())
            dispatch(getProfile(initialProfile))
            dispatch(pagedFeed(initialFeed))
            dispatch(onFeedStartedFalse())
        }
    }, [])
    return null
}