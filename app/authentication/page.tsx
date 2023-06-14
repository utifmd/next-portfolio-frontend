"use client"

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Input} from "@/components";
import {ButtonPrimary} from "@/components/buttons";
import {UnAuthenticated} from "@/app/authentication";
import {
    onInputChange, onInputUnfocused, onResetSubmission, onSignIn
} from "@/actions/authenticationAction";
import {censorEmail} from "@/utils";
import {useAppDispatch, useAppSelector} from "@/app/hooks";

export default function() {
    const {
        value,
        status,
        token,
        isSubmitted,
        isValid, message} = useAppSelector((state) => state.authentication)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => {}

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
        if (!isValid) return

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
                                disabled={typeof token !== "undefined"}
                                value={value.password}
                                onBlur={handleOnTextBlur}
                                onChange={handleOnTextChange}/>
                        </div>
                    </div>
                {message && <p className="text-red-500">{message}</p>}
                <UnAuthenticated fallback={<ButtonPrimary label="Authenticated" isDisable={true}/>}>
                    <ButtonPrimary
                        label="Login"
                        isDisable={status === "loading" || !isValid}
                        isLoading={status === "loading"}
                        type="submit"/>
                </UnAuthenticated>
            </form>
        </div>
    )
}