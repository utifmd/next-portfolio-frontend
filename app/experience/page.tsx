"use client"

import Image from "next/image";
import {ChangeEvent, useRef} from "react";
import {Input} from "../../components";
import {ButtonPrimary} from "../../components/Button";
import {AppDispatch} from "../../store";
import {
    addExperience,
    onIconAppended,
    onImageAppended,
    onInputChange,
    onInputUnfocused
} from "../../actions/experienceAction";
import {useAppDispatch, useAppSelector} from "../hooks";


export default function () {
    const {value, icon, images, isValid, status} = useAppSelector((state) => state.experience)
    const dispatch: AppDispatch = useAppDispatch()
    const reference = useRef({})

    const onPostExperience = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(addExperience())
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
    const handleOnFileChange = (appendable: any) => (e: Record<string, any>) => {
        e.preventDefault()
        const {id} = e.currentTarget
        const files: [] = e.target.files
        if (typeof files === "undefined") return

        for (const file of files) {
            dispatch(onInputChange([id, file]))
            dispatch(appendable(file))
        }
    }
    const onInputFileClick = (key: string) => (e: MouseEvent) => {
        e.preventDefault()
        reference.current[key]?.click()
    }
    const handleOnInputFileClick = (key: string) => (e: HTMLImageElement) => {
        reference.current[key] = e
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="w-full sm:w-[50%] p-6 text-center space-y-7">
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Experience Entry</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div className="md:col-span-2">
                        <Input id="title" type="text" placeholder="Enter title" value={value.title} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="md:col-span-2">
                        <Input id="description" type="text" placeholder="Enter description" value={value.description} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <input id="iconUrl" ref={handleOnInputFileClick("icon")} className={"hidden"} type="file" accept="image/*" multiple={false} onChange={handleOnFileChange(onIconAppended)} onBlur={handleOnTextBlur}/>{icon
                        ? <Image className="cursor-pointer" src={icon} alt={"icon appendable"} width={86} height={86} onClick={onInputFileClick("icon")} onBlur={handleOnTextBlur}/>
                        : <ButtonPrimary label="select icon" onClick={onInputFileClick("icon")} onBlur={handleOnTextBlur}/>}
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <Input id="demoUrl" type="text" placeholder="Enter file url" value={value.demoUrl} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                        <Input id="releasedUrl" type="text" placeholder="Enter released url" value={value.releasedUrl} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <input id="imageUrls" ref={handleOnInputFileClick("image")} className={"hidden"} type="file" accept="image/*" multiple={true} onChange={handleOnFileChange(onImageAppended)} onBlur={handleOnTextBlur}/>{images.length
                        ? images.map((image) => <Image className="cursor-pointer" src={image} alt={"images appendable"} width={86} height={86} onClick={onInputFileClick("image")} onBlur={handleOnTextBlur}/>)
                        : <ButtonPrimary label="select images" onClick={onInputFileClick("image")} onBlur={handleOnTextBlur}/>}
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <Input id="platform" type="text" placeholder="Enter platform" value={value.platform} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                        <Input id="type" type="text" placeholder="Enter type" value={value.type} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                </div>
                <ButtonPrimary label="Post" isDisable={status === "loading" || !isValid} isLoading={status === "loading"} onClick={onPostExperience}/>
            </div>
        </div>
    )
}