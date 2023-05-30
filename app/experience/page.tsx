"use client"

import Image from "next/image";
import {ChangeEvent, useEffect, useRef} from "react";
import {Input} from "../../components";
import {RoundedButton, ButtonPrimary} from "@/components/Button";
import {AppDispatch} from "@/store";
import {
    ExperiencePlatform, ExperienceType,
    addExperience,
    onIconAppended,
    onImageAppended,
    onInputChange,
    onInputUnfocused, onAddStack, onRemoveImageAppended
} from "@/actions/experienceAction";
import {useAppDispatch, useAppSelector} from "../hooks";
import Select from "../../components/Select";
import {camelize} from "@/utils";
import HoverIconBox from "@/components/sections/HoverIconBox";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {onResetSubmission} from "@/actions/educationAction";
import {useRouter} from "next/navigation";

export default function () {
    const {
        value,
        images,
        isValid,
        status,
        isSubmitted, icon } = useAppSelector<IExperienceState>((state) => state.experience)
    const dispatch: AppDispatch = useAppDispatch()
    const router = useRouter()
    const reference = useRef<Record<string, any>>({})

    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => void

            dispatch(onResetSubmission())
        router.back()
    }
    useEffect(onFormSubmitted, [isSubmitted])

    const onPostExperience = (e: any) => {
        e.preventDefault()
        dispatch(addExperience())
    }
    const handleOnFileClick =
        (i: number) => (url: string) => (e: any) => {
        e.preventDefault()
        if (url.length > 0) {
            console.log(`delete image ${url} on the server`)
            // dispatch(onRemoveImage(url))
            return
        }
        dispatch(onRemoveImageAppended(i))
    }
    const handleOnTextBlur = (e: any) => {
        e.preventDefault()
        dispatch(onInputUnfocused())
    }
    const handleOnTextPush = (e: any) => {
        if (e.key !== "Enter") return
        const elem = e.currentTarget

        dispatch(onAddStack(camelize(elem.value)))
        elem.value = ""
    }
    const handleOnTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {id, value} = e.currentTarget
        dispatch(onInputChange([id, value]))
    }
    const handleOnFileChange = (action: any) => (e: Record<string, any>) => {
        e.preventDefault()
        const {id} = e.currentTarget
        const files: [] = e.target.files
        if (typeof files === "undefined") return

        for (const file of files) {
            dispatch(onInputChange([id, file]))
            dispatch(action(file))
        }
    }
    const onInputFileClick = (key: string) => (e: any) => {
        e.preventDefault()
        reference.current[key].click()
    }
    const handleOnInputFileClick = (key: string) => (ref: any) => {
        reference.current[key] = ref
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="w-full sm:w-[50%] p-6 text-center space-y-7">
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Experience Entry</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                        <Select id="platform" label="platform" onChange={handleOnTextChange} onBlur={handleOnTextBlur}>{Object.keys(ExperiencePlatform).map((platform, i) =>
                            <option key={i} value={platform} selected={value.platform === platform}>{platform}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Select id="type" label="type" onChange={handleOnTextChange} onBlur={handleOnTextBlur}>{Object.keys(ExperienceType).map((type, i) =>
                            <option key={i} value={type} selected={value.type === type}>{type}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Input id="title" type="text" placeholder="Enter title" value={value.title} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div>
                        <Input id="description" type="text" placeholder="Enter description" value={value.description} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="md:col-span-2">
                        <Input id="demoUrl" type="text" placeholder="Enter file url" value={value.demoUrl} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="md:col-span-2">
                        <Input id="releasedUrl" type="text" placeholder="Enter released url" value={value.releasedUrl} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="flex flex-wrap">
                        {value.stack.map(mStack => <span className="text-base px-1">#{mStack}</span>)}
                    </div>
                    <div>
                        <Input id="stack" type="text" placeholder="Add stack" onKeyUp={handleOnTextPush} onBlur={handleOnTextBlur}/>
                    </div>
                    <div>
                        <input id="icon" ref={handleOnInputFileClick("icon")} className={"hidden"} type="file" accept="image/*" multiple={false} onChange={handleOnFileChange(onIconAppended)} onBlur={handleOnTextBlur}/>{icon || value.iconUrl.length > 0
                        ? <HoverIconBox icon={faTrash} onClick={handleOnFileClick(-1)(value.iconUrl)} onBlur={handleOnTextBlur}>{ icon
                            ? <Image className="absolute inset-0 object-cover" src={icon} alt={"icon appendable"} fill={true}/> : value.iconUrl
                                ? <Image className="absolute inset-0 object-cover" src={value.iconUrl} loader={() => value.iconUrl} alt={"icon appendable"} fill={true}/> : null}</HoverIconBox>
                        : <RoundedButton label="select icon" onClick={onInputFileClick("icon")}/>}
                    </div>
                    <div>
                        <input id="images" className="hidden" ref={handleOnInputFileClick("image")} type="file" accept="image/*" multiple={true} onChange={handleOnFileChange(onImageAppended)} onBlur={handleOnTextBlur}/>
                        <div className="grid grid-cols-3 gap-1 w-full">
                            {value.imageUrls.length > 0 && value.imageUrls.map((url, i) =>
                                <HoverIconBox key={i} icon={faTrash} onClick={handleOnFileClick(i)(url)} onBlur={handleOnTextBlur}>
                                    <Image className="object-cover" fill={true} src={url} loader={() => url} alt={"image appendable"}/>
                                </HoverIconBox>)}
                            {images.length > 0 && images.map((image, i) =>
                                <HoverIconBox key={i} icon={faTrash} onClick={handleOnFileClick(i)("")} onBlur={handleOnTextBlur}>
                                    <Image className="object-cover" fill={true} src={image} alt={"image appendable"}/>
                                </HoverIconBox>)}
                            <RoundedButton label="add images" onClick={onInputFileClick("image")}/>
                        </div>
                    </div>
                </div>
                <ButtonPrimary label="Post" isDisable={status === "loading" || !isValid} isLoading={status === "loading"} onClick={onPostExperience}/>
            </div>
        </div>
    )
}