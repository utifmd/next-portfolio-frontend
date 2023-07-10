import React from "react";
import Main from "@/app/Main";
import Preloader from "@/app/Preloader";
import axios, {AxiosResponse} from "axios";
import store from "@/store";
import {pagedFeed, PAGINATION_SIZE} from "@/actions/homeAction";
import {getProfile} from "@/actions/profileAction";

export const revalidate = 10
export default async function () {
    const {NEXT_PUBLIC_BASE_URL} = (process.env as any) as IEnvLocal
    const feedResponse: AxiosResponse = await axios.get(`${NEXT_PUBLIC_BASE_URL}/educations?page=0&size=${PAGINATION_SIZE}`)
    const profileResponse: AxiosResponse = await axios.get(`${NEXT_PUBLIC_BASE_URL}/profile/utifmd@gmail.com`)

    store.dispatch(getProfile(profileResponse.data))
    store.dispatch(pagedFeed(feedResponse.data))
    return (
        <div>
            <Preloader
                initialFeed={feedResponse.data}
                initialProfile={profileResponse.data} />
            <Main />
        </div>
    )
}