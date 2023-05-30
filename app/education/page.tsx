"use client"

import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Input, HoverIconBox} from "@/components";
import {ButtonPrimary, RoundedButton} from "@/components/Button";
import {
    onInputChange,
    onInputUnfocused,
    addEducation,
    onImageAppended,
    onResetImageAppended,
    onResetSubmission
} from "@/actions/educationAction"
import {useAppDispatch, useAppSelector} from "../hooks"

export default function() {
    const {
        value,
        status,
        isValid,
        isSubmitted, image} = useAppSelector(({education}) => education)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const reference = useRef<Record<string, any>>({})
    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => void

        dispatch(onResetSubmission())
        router.back()
    }
    useEffect(onFormSubmitted, [isSubmitted])
    const onPostEducation = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(addEducation())
    }
    const handleOnFileClick = (valueImageUrl: string) => (e: any) => {
        e.preventDefault()
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
        const {id} = e.currentTarget
        const files: [] = e.target.files
        if (typeof files === "undefined") return

        for (const file of files) {
            dispatch(onInputChange([id, file]))
            dispatch(onImageAppended(file))
        }
    }
    const onInputFileClick = (e: any) => {
        e.preventDefault()
        reference.current["image"]?.click()
    }
    const handleOnInputFileClick = (e: any) => {
        reference.current["image"] = e
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="w-full sm:w-[50%] p-6 text-center space-y-7">
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
                        <input ref={handleOnInputFileClick} className={"hidden"} id="imageUrl" type="file" accept="image/*" multiple={false} onChange={handleOnFileChange} onBlur={handleOnTextBlur} /> {image || value.imageUrl.length
                        ? <HoverIconBox icon={faTrash} onClick={handleOnFileClick(value.imageUrl)} onBlur={handleOnTextBlur}>{image
                            ? <Image className="absolute inset-0 object-cover" fill={true} src={image} alt={"image appendable"}/>: value.imageUrl.length > 0
                                ? <Image className="absolute inset-0 object-cover" fill={true} src={value.imageUrl} loader={() => value.imageUrl} alt={"image appendable"}/>:null}</HoverIconBox>
                        : <RoundedButton label="select image" onClick={onInputFileClick} />}
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <textarea className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                            id="content" placeholder="Enter content" value={value.content} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                        <Input id="desc" type="text" placeholder="Enter description" value={value.desc} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                    </div>
                </div>
                <ButtonPrimary label="Post" isDisable={status === "loading" || !isValid} isLoading={status === "loading"} onClick={onPostEducation}/>
            </div>
        </div>
    )
}