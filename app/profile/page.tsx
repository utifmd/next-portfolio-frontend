"use client"

import React, {useEffect, useRef} from "react";
import {Image, Input, Select, TextArea} from "@/components";
import {FileUploadField} from "@/helpers";
import {HoverIconBox} from "@/components/sections";
import {faClose, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ButtonPrimary, ButtonRounded} from "@/components/buttons";
import {Authenticated} from "@/app/authentication";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useRouter} from "next/navigation";
import {
    addRemovableImageUrls, onExcludeImageUrl,
    onImageAppended, onInputChange, onInputUnfocused,
    onResetImageAppended, onResetSubmission, updateDataProfile, updateLinkProfile
} from "@/actions/profileAction";
import {removeFiles} from "@/actions/fileAction";
import {updateMainProfile, setUseCase, setUseCaseDataId} from "@/actions/profileAction";
export default function (){
    const {
        value, useCase, isSubmitted, removableImageUrls, image,
        status, message, isValid, useCaseDataId} = useAppSelector(
            state=> state.profile
    )
    const dispatch = useAppDispatch()
    const router = useRouter()
    const reference = useRef<any>({})
    const onFormSubmitted = () => {
        if (isSubmitted && status === "loading") {
            dispatch(onResetSubmission())
            router.back()
        }
    }
    useEffect(onFormSubmitted, [isSubmitted])
    const onSubmitProfile = (e: any) => {
        e.preventDefault()

        switch (useCase) {
            case "data":
                if (!useCaseDataId) break
                dispatch(updateDataProfile(useCaseDataId))
                break

            case "link":
                dispatch(updateLinkProfile())
                break

            default: {
                if (removableImageUrls.length > 0)
                    dispatch(removeFiles({removableImageUrls}))

                dispatch(updateMainProfile())
                break
            }
        }
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
    const onUseCaseChange = (e: any) => {
        const value = e.currentTarget.value
        if (!value) return
        dispatch(setUseCase(value))
    }
    const onUseCaseDataIdChange = (e: any) => {
        const value = e.currentTarget.value
        if (!value) return
        dispatch(setUseCaseDataId(value))
    }

    const linkComponent= (<div className="grid gap-4 md:grid-cols-2 mb-4">
        {value.links && Object
            .entries(value.links)
            .filter(([key]) => key !== "id" && key !== "profileId" && key !== "createdAt" && key !== "updatedAt")
            .map(([profileLinkKey, profileLinkValue]) =>
                <div className="md:col-span-2">
                    <Input id={profileLinkKey} type="text" placeholder={`Enter ${profileLinkKey}`} value={profileLinkValue} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                </div>
            )
        }
    </div>)

    const dataComponent = (<div className="grid gap-4 md:grid-cols-2 mb-4">
        {value.data && value.data
            .filter(({id}) => id === useCaseDataId)
            .map(valueData => (<>
                <div className="md:col-span-2">
                    <Input id="title" type="text" placeholder={`Enter ${valueData.type} title`} value={valueData.title} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                </div>
                <div className="md:col-span-2">
                    <TextArea id="description" placeholder={`Enter ${valueData.type} description`} value={valueData.description} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
                </div>
            </>))
        }
    </div>)

    const mainComponent = (<div className="grid gap-4 md:grid-cols-2 mb-4">
        <div className="md:col-span-2">
            <Input id="fullName" type="text" placeholder="Enter full name" value={value?.fullName} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
        </div>
        <div className="md:col-span-2">
            <Input id="jobTitle" type="text" placeholder="Enter job title" value={value?.jobTitle} onChange={handleOnTextChange} onBlur={handleOnTextBlur}/>
        </div>
        <div className="md:col-span-2">
            <Input id="role" type="text" disabled={true} placeholder="Enter job title" value={value?.role} onBlur={handleOnTextBlur}/>
        </div>
        <div className="flex justify-center items-center">
            <input className="hidden" id={FileUploadField.SINGLE} type="file" accept="image/*" multiple={false} ref={handleInputFileRef} onChange={handleOnFileChange} onBlur={handleOnTextBlur} />
            {image || value.imageUrl.length > 0
                ? <HoverIconBox icons={[faTrash, faClose]} disabled={status === "loading"} onTLClick={handleOnFileRemove(value.imageUrl)} onTRClick={value.imageUrl.length > 0 ? handleOnFileClose(value.imageUrl) : undefined} onBlur={handleOnTextBlur}>
                    {image
                        ? <Image className="absolute inset-0 object-cover" source={image} alt={"image appendable"}/>
                        : value.imageUrl.length > 0
                            ? <Image className="absolute inset-0 object-cover" source={value.imageUrl} alt={"image appendable"}/>
                            : null
                    } </HoverIconBox>
                : <ButtonRounded label="select image" onClick={onInputFileClick} />}
        </div>
        <div className="h-full w-full space-y-4 text-left">
            <TextArea id="bio" placeholder="Enter bio" value={value.bio} onChange={handleOnTextChange} onBlur={handleOnTextBlur} />
        </div>
    </div>)

    return(
        <div className="flex min-h-screen justify-center items-center">
            <form className="w-full sm:w-[50%] p-6 text-center space-y-7" onSubmit={onSubmitProfile}>
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">{useCase} Profile Entry</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                {useCase === "data" ? dataComponent : useCase === "link" ? linkComponent : mainComponent}
                <div className="flex justify-center space-x-1.5">
                    <Select value={useCase} onChange={onUseCaseChange} onBlur={handleOnTextBlur} label="use cases">
                        <option value="main" defaultValue={useCase}>MAIN</option>
                        <option value="link" defaultValue={useCase}>LINK</option>
                        <option value="data" defaultValue={useCase}>DATA</option>
                    </Select>
                    { useCase === "data" &&
                        <Select value={useCaseDataId} onChange={onUseCaseDataIdChange} onBlur={handleOnTextBlur} label="profile data">
                            {value.data && value.data.map(({type, id}) =>
                                <option value={id} defaultValue={useCaseDataId}>{type}</option>
                            )}
                        </Select>
                    }
                </div>
                {message && <p className="text-center text-red-500 text-sm italic">{message}</p>}
                <Authenticated fallback={
                    <ButtonPrimary label="Unauthenticated" isDisable={true}/>}>
                    <div className="flex justify-center items-center space-x-1.5">
                        <ButtonPrimary label="Update" type="submit" isDisable={status === "loading" || !isValid} isLoading={status === "loading"} />
                    </div>
                </Authenticated>
            </form>
        </div>
    )
}