"use server"

import {Surface} from "../components/sections";
import {ButtonPrimary} from "../components/Button";
import StateProvider from "../store/StateProvider";
import Footer from "./Footer";
import Home from "./Home";

export default async function Main() {
    return (
        <main
            className="ease-linear transition-all duration-500 text-gray-700 dark:text-gray-300 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col h-screen px-0 sm:px-6 items-center text-center place-content-center space-y-4 uppercase">
                <p className="text-3xl">Portfolio</p>
                <div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/>
                <p>A Little single page by Utif Milkedori</p>
            </div>
            <StateProvider>
                <Home/>
                <Footer/>
            </StateProvider>
        </main>
    )
}
