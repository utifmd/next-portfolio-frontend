"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
import {Input} from "@/components";
import {HoverIconBox} from "@/components/sections";
import {ButtonPrimary, ButtonRounded} from "@/components/buttons";
import {Authenticated} from "@/app/authentication";
import {
    onInputChange,
    onInputUnfocused,
    addEducation,
    onImageAppended,
    onResetImageAppended,
    onResetSubmission
} from "@/actions/educationAction"
import {useAppDispatch, useAppSelector} from "@/app/hooks"
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default function() {
    const {
        value,
        status,
        isValid,
        isSubmitted,
        image, message} = useAppSelector(({education}) => education)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const reference = useRef<any>({})
    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => void

        dispatch(onResetSubmission())
        router.back()
    }
    useEffect(onFormSubmitted, [isSubmitted])
    const onPostEducation = (e: any) => {
        e.preventDefault()
        dispatch(addEducation())
    }
    const handleOnFileRemove = (valueImageUrl: string) => (e: any) => {
        e.preventDefault()
        reference.current["image"].value = null

        if (valueImageUrl.length > 0) {
            console.log(`delete image ${valueImageUrl} on the server`)
            // dispatch(onRemoveImage(valueImageUrl))
            return
        }
        dispatch(onResetImageAppended())
    }
    const handleOnTextBlur = (e: any) => {
        e.preventDefault()
        dispatch(onInputUnfocused())
    }
    const handleOnTextChange = (e: any) => {
        e.preventDefault()
        const {id, value} = e.currentTarget
        dispatch(onInputChange([id, value]))
    }
    const handleOnFileChange = (e: Record<string, any>) => {
        e.preventDefault()
        const {id, files} = e.currentTarget
        console.log(`files len: ${files.length}`)
        if (files.length <= 0) return

        for (const file of files) {
            dispatch(onInputChange([id, file]))
            dispatch(onImageAppended(file))
        }
    }
    const onInputFileClick = (e: any) => {
        e.preventDefault()
        reference.current["image"]?.click()
    }
    const handleInputFileRef = (e: any) => {
        reference.current["image"] = e
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <form className="w-full sm:w-[50%] p-6 text-center space-y-7" onSubmit={onPostEducation}>
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Education Entry</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div className="md:col-span-2">
                        <Input id="title" type="text" placeholder="Enter title" value={value.title} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                    </div>
                    <div className="md:col-span-2">
                        <Input id="fileUrl" type="text" placeholder="Enter file url" value={value.fileUrl} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <input className="hidden" id="image" type="file" accept="image/*"
                            multiple={false}
                            ref={handleInputFileRef}
                            onChange={handleOnFileChange}
                            onBlur={handleOnTextBlur} /> {image || value.imageUrl.length > 0 ?
                        <HoverIconBox icon={faTrash} onClick={handleOnFileRemove(value.imageUrl)} onBlur={handleOnTextBlur}> {image ?
                            <Image className="absolute inset-0 object-cover" fill={true} src={image} alt={"image appendable"}/>: value.imageUrl.length > 0 ?
                                <Image className="absolute inset-0 object-cover" fill={true} src={value.imageUrl} loader={() => value.imageUrl} alt={"image appendable"}/>: null}</HoverIconBox> :
                        <ButtonRounded label="select image" onClick={onInputFileClick} />}
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <textarea className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                            id="content" placeholder="Enter content" value={value.content} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                        <Input id="desc" type="text" placeholder="Enter description" value={value.desc} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                    </div>
                </div>
                {message && <p className="text-red-500">{message}</p>}
                <Authenticated fallback={
                    <ButtonPrimary label="Unauthenticated" isDisable={true}/>}>
                    <ButtonPrimary
                        label="Post"
                        type="submit"
                        isDisable={status === "loading" || !isValid}
                        isLoading={status === "loading"} />
                </Authenticated>
            </form>
        </div>
    )
}