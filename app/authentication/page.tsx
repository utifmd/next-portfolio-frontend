"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {ButtonPrimary} from "@/components/Button";
import {Input} from "@/components";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {censorEmail} from "@/utils";
import {onInputChange, onInputUnfocused, onResetSubmission, onSignIn} from "@/actions/authenticationAction";

export default function () {
    const {
        value,
        status,
        isSubmitted,
        isValid} = useAppSelector((state) => state.authentication)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => void

        dispatch(onResetSubmission())
        router.back()
    }
    useEffect(onFormSubmitted, [isSubmitted])

    const handleOnTextChange = (e: any) => {
        e.preventDefault()
        const {id, value} = e.currentTarget
        dispatch(onInputChange([id, value.trim()]))
    }
    const handleOnTextBlur = (e: any) => {
        e.preventDefault()
        dispatch(onInputUnfocused())
    }
    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        console.log("handleOnSubmit")
        dispatch(onSignIn())
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <form className="w-full sm:w-[50%] p-6 text-center space-y-7" onSubmit={handleOnSubmit}>
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Sign in</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div className="md:col-span-2">
                        <Input id="email" disabled={true} type="text" placeholder="Enter email" value={censorEmail(value.email)} onChange={handleOnTextChange} />
                    </div>
                    <div className="md:col-span-2">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={value.password}
                            onBlur={handleOnTextBlur}
                            onChange={handleOnTextChange}/>
                    </div>
                </div>
                <ButtonPrimary
                    label="Login"
                    isDisable={status === "loading" || !isValid}
                    isLoading={status === "loading"}
                    type="submit"/>
            </form>
        </div>
    )
}