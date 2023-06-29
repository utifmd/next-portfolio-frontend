"use client"
import {useEffect} from "react";
import {onFeedStartedFalse, pagedFeed} from "@/actions/homeAction";
import {useAppDispatch, useAppSelector} from "@/app/hooks";

export default function ({initialData}: {initialData: ISchema[]}): JSX.Element {
    const {isStarted} = useAppSelector(state => state.home.feed)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isStarted) {
            dispatch(pagedFeed(initialData))
            dispatch(onFeedStartedFalse())
        }
    }, [])
    return <></>
}