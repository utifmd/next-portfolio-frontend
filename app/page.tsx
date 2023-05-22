"use client"

import {StateProvider} from "../store";
import {HomeContainer} from "../containers";

export default function Main() {
    return (
        <StateProvider>
            <HomeContainer/>
        </StateProvider>
    )
}