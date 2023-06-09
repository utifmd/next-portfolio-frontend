"use client"

import {useRouter} from "next/navigation";
import React, {useEffect, useRef} from "react";
import {Input, TextArea, Image} from "@/components";
import {HoverIconBox} from "@/components/sections";
import {ButtonPrimary, ButtonRounded} from "@/components/buttons";
import {Authenticated} from "@/app/authentication";
import {
    addEducation,
    removeEducation,
    onInputChange,
    onInputUnfocused,
    onImageAppended,
    onResetImageAppended,
    onResetSubmission,
    addRemovableImageUrls,
    updateEducation, onExcludeImageUrl
} from "@/actions/educationAction"
import {useAppDispatch, useAppSelector} from "@/app/hooks"
import {faClose, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FileUploadField} from "@/helpers";
import {removeFiles} from "@/actions/fileAction";

export default function(){
    const {
        value,
        status,
        isValid,
        isSubmitted,
        isSelected,
        removableImageUrls,
        image, message} = useAppSelector(
            state=> state.education
    )
    const dispatch = useAppDispatch()
    const router = useRouter()
    const reference = useRef<any>({})
    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => {}

        dispatch(onResetSubmission())
        router.back()
    }
    useEffect(onFormSubmitted, [isSubmitted])
    const onSubmitEducation = (e: any) => {
        e.preventDefault()

        if (!isSelected) {
            dispatch(addEducation())
            return
        }
        if (removableImageUrls.length > 0)
            dispatch(removeFiles({removableImageUrls}))

        dispatch(updateEducation())
    }
    const onRemoveEducation = (e: any) => {
        e.preventDefault()

        if (removableImageUrls.length > 0)
            dispatch(removeFiles({removableImageUrls}))

        dispatch(removeEducation())
    }
    const handleOnFileClose = (url?: string) => (e: any) => {
        e.preventDefault()
        if (typeof url === "undefined") return
        dispatch(onExcludeImageUrl(url))
    }
    const handleOnFileRemove = (url: string) => (e: any) => {
        e.preventDefault()
        reference.current[FileUploadField.SINGLE].value = null

        if (url.length > 0) {
            dispatch(addRemovableImageUrls(url))
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
    const handleOnFileChange = (e: any) => {
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
        reference.current[FileUploadField.SINGLE]?.click()
    }
    const handleInputFileRef = (e: any) => {
        reference.current[FileUploadField.SINGLE] = e
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <form className="w-full sm:w-[50%] p-6 text-center space-y-7" onSubmit={onSubmitEducation}>
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
                        <input
                            className="hidden"
                            id={FileUploadField.SINGLE}
                            type="file"
                            accept="image/*"
                            multiple={false}
                            ref={handleInputFileRef}
                            onChange={handleOnFileChange}
                            onBlur={handleOnTextBlur} />
                        {image || value.imageUrl.length > 0
                            ? <HoverIconBox
                                icons={[faTrash, faClose]}
                                disabled={status === "loading"}
                                onTLClick={handleOnFileRemove(value.imageUrl)}
                                onTRClick={value.imageUrl.length > 0 ? handleOnFileClose(value.imageUrl) : undefined}
                                onBlur={handleOnTextBlur}>
                                {image
                                    ? <Image
                                        className="absolute inset-0 object-cover"
                                        source={image}
                                        alt={"image appendable"}/>

                                    : value.imageUrl.length > 0
                                        ? <Image
                                            className="absolute inset-0 object-cover"
                                            source={value.imageUrl}
                                            alt={"image appendable"}/>
                                        : null
                                } </HoverIconBox>
                            : <ButtonRounded label="select image" onClick={onInputFileClick} />}
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <TextArea id="content" placeholder="Enter content" value={value.content} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                        <TextArea id="desc" type="text" placeholder="Enter description" value={value.desc} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                    </div>
                </div>
                {message && <p className="text-center text-red-500 text-sm italic">{message}</p>}
                <Authenticated fallback={
                    <ButtonPrimary label="Unauthenticated" isDisable={true}/>}>
                    <div className="flex justify-center items-center space-x-1.5">
                        <ButtonPrimary
                            label={isSelected ? "Update" : "Post"}
                            type="submit"
                            isDisable={status === "loading" || !isValid}
                            isLoading={status === "loading"} />
                        { isSelected &&
                            <div className="cursor-pointer p-3" onClick={onRemoveEducation}>
                                <FontAwesomeIcon color={"#059669"} icon={faTrash}/>
                            </div>
                        }
                    </div>
                </Authenticated>
            </form>
        </div>
    )
}