import React from "react";
import Main from "@/app/Main";
import Preloader from "@/app/Preloader";
import axios from "axios";
import store from "@/store";
import {pagedFeed, PAGINATION_SIZE} from "@/actions/homeAction";

export const revalidate = 10
/*
* TODO
*  1. profile table
* */
export default async function () {
    const {NEXT_PUBLIC_BASE_URL} = (process.env as any) as IEnvLocal
    const {data} = await axios.get(
        `${NEXT_PUBLIC_BASE_URL}/educations?page=0&size=${PAGINATION_SIZE}`
    )
    store.dispatch(pagedFeed(data))
    return (
        <div>
            <Preloader initialFeed={data} />
            <Main />
        </div>
    )
}