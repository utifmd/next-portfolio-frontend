import React from "react";
import store from "@/store";
import Main from "@/app/Main";
import {pagedFeed, PAGINATION_SIZE} from "@/actions/homeAction";
import axios from "axios";

export default async function () {
    try {
        const {NEXT_PUBLIC_BASE_URL} = (process.env as any) as IEnvLocal
        const {data} = await axios.get(
            `${NEXT_PUBLIC_BASE_URL}/educations?page=0&size=${PAGINATION_SIZE}`
        )
        store.dispatch(pagedFeed(data))
    } catch (e) {
        const {message} = e as Error
        console.log(message || JSON.stringify(e))
    }
    /*
    * TODO
    *  1. dispatch action in preloader
    * */
    return <Main />
}