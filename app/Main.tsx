import React from "react";
import Home from "@/app/Home";
import {Hero} from "@/components/sections";
import store from "@/store";

export default function () {
    const {
        habit,
        profile,
        intro,
        feed} = store.getState().home
    return (
        <div>
            <Hero />
            <Home
                habit={habit}
                profile={profile}
                intro={intro}
                feed={feed} />
        </div>
    )
}