"use client"

import {ButtonPrimary} from "../../components/Button";
import {Input} from "../../components";
import {AppDispatch} from "../../store";
import {onInputChange, onInputUnfocused, addEducation, onImageAppended} from "../../actions/educationAction"
import {useAppDispatch, useAppSelector} from "../hooks"
import {ChangeEvent, useRef} from "react";
import Image from "next/image";

export default function() {
    const {value, status, isValid, images} = useAppSelector((state) => state.education)
    const dispatch: AppDispatch = useAppDispatch()
    const imageRef = useRef({})

    const onPostEducation = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(addEducation())
    }
    const handleOnTextBlur = (e: FocusEvent) => {
        e.preventDefault()
        dispatch(onInputUnfocused())
    }
    const handleOnTextChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    const onInputFileClick = (e: MouseEvent) => {
        imageRef.current["image"]?.click()
    }
    const handleOnInputFileClick = (e: HTMLImageElement) => {
        imageRef.current["image"] = e
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
                        <input ref={handleOnInputFileClick} className={"hidden"} id="imageUrl" type="file" accept="image/*" multiple={false} onChange={handleOnFileChange} onBlur={handleOnTextBlur} /> {images.length
                        ? images.map((image, i) => <Image key={i} src={image} alt={"image appendable"} width={86} height={86}/>)
                        : <ButtonPrimary label="select image" onClick={onInputFileClick} onBlur={handleOnTextBlur}/>
                    }
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