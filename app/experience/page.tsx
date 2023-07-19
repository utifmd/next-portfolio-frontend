"use client"

import {useRouter} from "next/navigation";
import React, {useEffect, useRef} from "react";
import {TextArea, Select, Input, Image} from "@/components";
import {HoverIconBox} from "@/components/sections";
import {ButtonPrimary, ButtonRounded} from "@/components/buttons";
import {Authenticated} from "@/app/authentication";
import {AppDispatch} from "@/store";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {
    ExperiencePlatform,
    ExperienceType,
    addExperience,
    removeExperience,
    onIconAppended,
    onImageAppended,
    onInputChange,
    onInputUnfocused,
    onAddStack,
    onRemoveImageAppended,
    onRemoveStack,
    onResetSubmission,
    onAddRemovableImageIds,
    updateExperience, onExcludeImageUrl
} from "@/actions/experienceAction";
import {removeFiles} from "@/actions/fileAction";
import {camelize} from "@/utils";
import {faTrash, faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FileUploadField, mapUrlToId} from "@/helpers";

export default function () {
    const {
        value,
        images,
        isValid,
        status,
        isSubmitted, icon,
        isSelected,
        removableImageIds,
        message

    } = useAppSelector<IExperienceState>(
        state => state.experience
    )
    const dispatch: AppDispatch = useAppDispatch()
    const router = useRouter()
    const reference = useRef<any>({})
    const onSubmitExperience = (e: any) => {
        e.preventDefault()
        if (!isSelected) {
            dispatch(addExperience())
            return
        }
        if (removableImageIds.length)
            dispatch(removeFiles({removableImageIds}))

        dispatch(updateExperience())
    }
    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => {}

        dispatch(onResetSubmission())
        router.back()
    }
    useEffect(onFormSubmitted, [isSubmitted])

    const onRemoveExperience = (e: any) => {
        e.preventDefault()
        if (removableImageIds.length)
            dispatch(removeFiles({removableImageIds}))

        dispatch(removeExperience())
    }
    const handleOnFileClick = (index: number) => (url?: string) => (e: any) => {
        e.preventDefault()

        let key = index < 0 ? FileUploadField.SINGLE : FileUploadField.MULTIPLE
        reference.current[key].value = null

        if (url) {
            const fileId = mapUrlToId(url)
            dispatch(onAddRemovableImageIds(fileId))
            return
        }
        dispatch(onRemoveImageAppended(index))
    }
    const handleOnFileClose = (url?: string) => (e: any) => {
        e.preventDefault()
        if (typeof url !== "string") return
        dispatch(onExcludeImageUrl(url))
    }
    const handleOnTextBlur = (e: any) => {
        e.preventDefault()
        dispatch(onInputUnfocused())
    }
    const handleOnTextPush = (e: any) => {
        if (e.key !== "Enter") return

        const elem = e.currentTarget
        if (elem.value.trim().length <= 0) return

        dispatch(onAddStack(camelize(elem.value)))
        elem.value = ""
    }
    const handleOnTextChange = (e: any) => {
        e.preventDefault()
        const {id, value} = e.currentTarget
        dispatch(onInputChange([id, value]))
    }
    const handleOnFileChange = (action: any) => (e: any) => {
        e.preventDefault()
        const {id, files} = e.currentTarget
        console.log(`files len: ${files.length}`)

        if (files.length <= 0) return
        const value = id === FileUploadField.MULTIPLE ? files : files[0]

        dispatch(onInputChange([id, value]))
        for (const file of files) dispatch(action(file))
    }
    const handleOnItemStackClick = (i: number) => (e: any) => {
        e.preventDefault()
        dispatch(onRemoveStack(i))
    }
    const onInputFileClick = (key: string) => (e: any) => {
        e.preventDefault()
        reference.current[key].click()
    }
    const handleInputFileRef = (key: string) => (e: any) => {
        reference.current[key] = e
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <form className="w-full sm:w-[50%] p-6 text-center space-y-7" onSubmit={onSubmitExperience}>
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Experience Entry</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                        <Select
                            id="platform"
                            label="platform"
                            onChange={handleOnTextChange}
                            onBlur={handleOnTextBlur}
                            value={value.platform}>
                            {Object.keys(ExperiencePlatform).map((platform, i) =>
                                <option key={i} value={platform} defaultValue={value.platform}>{platform}</option>
                            )}
                        </Select>
                    </div>
                    <div>
                        <Select
                            id="type"
                            label="type"
                            onChange={handleOnTextChange}
                            onBlur={handleOnTextBlur}
                            value={value.type}>
                            {Object.keys(ExperienceType).map((type, i) =>
                                <option key={i} value={type} defaultValue={value.type}>{type}</option>
                            )}
                        </Select>
                    </div>
                    <div>
                        <Input id="title" type="text" placeholder="Enter title" value={value.title} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div>
                        <TextArea
                            id="description" placeholder="Enter description" value={value.description} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="flex flex-wrap">{value.stack.map((mStack, i) =>
                        <span key={i} onClick={handleOnItemStackClick(i)} className="text-base px-1 cursor-pointer hover:text-red-600 hover:dark:text-red-400 hover:line-through">#{mStack}</span>)}</div>
                    <div>
                        <Input id="stack" type="text" placeholder="Add stack" onKeyUp={handleOnTextPush} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <input
                            className="hidden"
                            id={FileUploadField.SINGLE}
                            type="file"
                            accept="image/*"
                            multiple={false}
                            ref={handleInputFileRef(FileUploadField.SINGLE)}
                            onChange={handleOnFileChange(onIconAppended)}
                            onBlur={handleOnTextBlur}/>
                        {icon || value.iconUrl
                            ? <HoverIconBox
                                icons={[faTrash, faClose]}
                                disabled={status === "loading"}
                                onTLClick={value.iconUrl ? handleOnFileClick(-1)(value.iconUrl) : undefined}
                                onTRClick={value.iconUrl ? handleOnFileClose(value.iconUrl) : undefined}
                                onBlur={handleOnTextBlur}>
                                {icon
                                    ? <Image className="absolute inset-0 object-cover" source={icon} alt={"icon appendable"}/>
                                    : value.iconUrl
                                        ? <Image className="absolute inset-0 object-cover" source={value.iconUrl} alt={"icon appendable"}/>
                                        : null
                                } </HoverIconBox>
                            : <ButtonRounded label="select icon" onClick={onInputFileClick(FileUploadField.SINGLE)}/>}
                    </div>
                    <div>
                        <input
                            className="hidden"
                            id={FileUploadField.MULTIPLE}
                            type="file"
                            accept="image/*"
                            multiple={true}
                            ref={handleInputFileRef(FileUploadField.MULTIPLE)}
                            onChange={handleOnFileChange(onImageAppended)}
                            onBlur={handleOnTextBlur}/>
                        <div className="flex flex-wrap justify-center items-center">
                            {value.imageUrls && value.imageUrls?.map((url, i) =>
                                <HoverIconBox
                                    key={i}
                                    disabled={status === "loading"}
                                    icons={[faTrash, faClose]}
                                    onTLClick={handleOnFileClick(i)(url)}
                                    onTRClick={handleOnFileClose(url)}
                                    onBlur={handleOnTextBlur}>
                                    <Image className="object-cover" source={url} alt="image form"/>
                                </HoverIconBox>)}
                            {images.length > 0 && images.map((image, i) =>
                                <HoverIconBox
                                    key={i}
                                    disabled={status === "loading"}
                                    icons={[faTrash, faClose]}
                                    onTLClick={handleOnFileClick(i)()}
                                    onBlur={handleOnTextBlur}>
                                    <Image className="object-cover" source={image} alt="image form"/>
                                </HoverIconBox>)}
                            <ButtonRounded label="images (optional)" onClick={onInputFileClick(FileUploadField.MULTIPLE)}/>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <Input id="demoUrl" type="text" placeholder="Enter demo url (optional)" value={value.demoUrl} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
                    </div>
                    <div className="md:col-span-2">
                        <Input id="releasedUrl" type="text" placeholder="Enter released url" value={value.releasedUrl} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
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
                            <div className="cursor-pointer p-3" onClick={onRemoveExperience}>
                                <FontAwesomeIcon color={"#059669"} icon={faTrash}/>
                            </div>
                        }
                    </div>
                </Authenticated>
            </form>
        </div>
    )
}