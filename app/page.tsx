import React from "react";
import Main from "@/app/Main";
import Preloader from "@/app/Preloader";
import store from "@/store";
import {pagedFeed, getInitialFeedJson} from "@/actions/homeAction";
import {getProfile, getInitialProfileJson} from "@/actions/profileAction";
export default async function () {
    const feedResponse = await getInitialFeedJson()
    const profileResponse = await getInitialProfileJson()

    store.dispatch(getProfile(profileResponse))
    store.dispatch(pagedFeed(feedResponse))
    return (
        <div>
            <Preloader
                initialFeed={feedResponse}
                initialProfile={profileResponse} />
            <Main />
        </div>
    )
}