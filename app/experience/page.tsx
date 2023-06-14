"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import {ChangeEvent, useEffect, useRef} from "react";
import {Select, Input} from "@/components";
import {HoverIconBox} from "@/components/sections";
import {ButtonPrimary, ButtonRounded} from "@/components/buttons";
import {Authenticated} from "@/app/authentication";
import {AppDispatch} from "@/store";
import {onResetSubmission} from "@/actions/educationAction";
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
    onRemoveStack
} from "@/actions/experienceAction";
import {camelize} from "@/utils";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function () {
    const {
        value,
        images,
        isValid,
        status,
        isSubmitted, icon,
        isSelected, message} = useAppSelector<IExperienceState>((state) => state.experience)
    const dispatch: AppDispatch = useAppDispatch()
    const router = useRouter()
    const reference = useRef<any>({})

    const onFormSubmitted = () => {
        if (!isSubmitted || status !== "idle") return () => void

            dispatch(onResetSubmission())
        router.back()
    }
    useEffect(onFormSubmitted, [isSubmitted])

    const onRemoveExperience = (e: any) => {
        e.preventDefault()
        dispatch(removeExperience())
    }

    const onPostExperience = (e: any) => {
        e.preventDefault()
        dispatch(addExperience())
    }
    const handleOnFileClick = (index: number) => (url: string) => (e: any) => {
        e.preventDefault()

        reference.current[index < 0 ? "icon" : "images"].value = null
        if (url.length > 0) {
            console.log(`delete image ${url} on the server`)
            // dispatch(onRemoveImage(url))
            return
        }
        dispatch(onRemoveImageAppended(index))
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
    const handleOnTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {id, value} = e.currentTarget
        dispatch(onInputChange([id, value]))
    }
    const handleOnFileChange = (action: any) => (e: Record<string, any>) => {
        e.preventDefault()
        const {id, files} = e.currentTarget

        console.log(`files len: ${files.length}`)
        if (files.length <= 0) return

        for (const file of files) {
            dispatch(onInputChange([id, file]))
            dispatch(action(file))
        }
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
            <form className="w-full sm:w-[50%] p-6 text-center space-y-7" onSubmit={onPostExperience}>
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Experience Entry</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                        <Select id="platform" label="platform" onChange={handleOnTextChange} onBlur={handleOnTextBlur}>{Object.keys(ExperiencePlatform).map((platform, i) =>
                            <option key={i} value={platform} defaultValue={value.platform}>{platform}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Select id="type" label="type" onChange={handleOnTextChange} onBlur={handleOnTextBlur}>{Object.keys(ExperienceType).map((type, i) =>
                            <option key={i} value={type} defaultValue={value.type}>{type}</option>)}
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
                    <div className="flex flex-wrap">{value.stack.map((mStack, i) =>
                        <span onClick={handleOnItemStackClick(i)} className="text-base px-1 cursor-pointer hover:text-red-600 hover:dark:text-red-400 hover:line-through">#{mStack}</span>)}</div>
                    <div>
                        <Input id="stack" type="text" placeholder="Add stack" onKeyUp={handleOnTextPush} onBlur={handleOnTextBlur}/>
                    </div>
                    <div>
                        <input id="icon" ref={handleInputFileRef("icon")} className={"hidden"} type="file" accept="image/*" multiple={false} onChange={handleOnFileChange(onIconAppended)} onBlur={handleOnTextBlur}/>{icon || value.iconUrl.length > 0 ?
                        <HoverIconBox icon={faTrash} onClick={handleOnFileClick(-1)(value.iconUrl)} onBlur={handleOnTextBlur}>{icon ?
                            <Image className="absolute inset-0 object-cover" src={icon} alt={"icon appendable"} fill={true}/> : value.iconUrl ?
                                <Image className="absolute inset-0 object-cover" src={value.iconUrl} loader={() => value.iconUrl} alt={"icon appendable"} fill={true}/> : null}</HoverIconBox>:
                        <ButtonRounded label="select icon" onClick={onInputFileClick("icon")}/>}
                    </div>
                    <div>
                        <input id="images" className="hidden" ref={handleInputFileRef("images")} type="file" accept="image/*" multiple={true} onChange={handleOnFileChange(onImageAppended)} onBlur={handleOnTextBlur}/>
                        <div className="grid grid-cols-3 gap-1 w-full">{value.imageUrls.length > 0 && value.imageUrls.map((url, i) =>
                            <HoverIconBox key={i} icon={faTrash} onClick={handleOnFileClick(i)(url)} onBlur={handleOnTextBlur}>
                                <Image className="object-cover" fill={true} src={url} loader={() => url} alt={"image appendable"}/></HoverIconBox>)}{images.length > 0 && images.map((image, i) =>
                            <HoverIconBox key={i} icon={faTrash} onClick={handleOnFileClick(i)("")} onBlur={handleOnTextBlur}>
                                <Image className="object-cover" fill={true} src={image} alt={"image appendable"}/></HoverIconBox>)}
                            <ButtonRounded label="add images" onClick={onInputFileClick("images")}/>
                        </div>
                    </div>
                </div>
                {message && <p className="text-red-500">{message}</p>}
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