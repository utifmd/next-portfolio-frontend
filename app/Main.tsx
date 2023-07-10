import React from "react";
import Home from "@/app/Home";
import {Hero} from "@/components/sections";
import store from "@/store";
export default function () {
    const state = store.getState()
    return (
        <div>
            <Hero />
            <Home
                status={state.home.status}
                profile={state.profile}
                feed={state.home.feed} />
        </div>
    )
}