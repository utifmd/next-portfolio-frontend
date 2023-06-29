import React from "react";
import {HomeContainer} from "@/containers/homeContainer";
import {Hero} from "@/components/sections";

export default async function Main() {
    return (
        <div>
            <Hero />
            <HomeContainer />
        </div>
    )
}