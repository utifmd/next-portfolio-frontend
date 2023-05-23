"use client"

import {ButtonPrimary} from "../../components/Button";
import {Input} from "../../components";
import {AppDispatch} from "../../store";
import {onTextInputChange, addEducation} from "../../actions/educationAction"
import {useAppDispatch, useAppSelector} from "../hooks"

export default function() {
    const {value, status} = useAppSelector((state) => state.education)
    const dispatch: AppDispatch = useAppDispatch()
    const onPostEducation = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(addEducation())
    }
    const handleTextInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {id, value} = e.currentTarget
        dispatch(onTextInputChange([id, value]))
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
                        <Input id="title" type="text" placeholder="Enter title" value={value.title} onChange={handleTextInput} />
                    </div>
                    <div className="md:col-span-2">
                        <Input id="imageUrl" type="text" placeholder="Enter image url" value={value.imageUrl} onChange={handleTextInput}/>
                    </div>
                    <div className="relative bg-white overflow-hidden appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600">
                        <input className="hidden" type="file" id="file" multiple={false} value={value.fileUrl} onChange={handleTextInput}/>
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <textarea id="content"
                            className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                            placeholder="Enter content" value={value.content} onChange={handleTextInput} />
                        <Input id="desc" type="text" placeholder="Enter description" value={value.desc} onChange={handleTextInput} />
                        <div className="hidden">
                            <div className="absolute z-40 left-0 mt-2 w-full">
                                <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                                    <div className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonPrimary label="Post" isLoading={status === "loading"} onClick={onPostEducation}/>
            </div>
        </div>
    )
}