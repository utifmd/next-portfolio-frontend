import {ButtonPrimary} from "../../components/Button";
import {Input} from "../../components";

export default function () {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="w-full sm:w-[50%] p-6 text-center space-y-7">
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Education Entry</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div className="md:col-span-2">
                        <Input type="text" placeholder="Enter title"/>
                    </div>
                    <div className="md:col-span-2">
                        <Input type="text" placeholder="Enter source"/>
                    </div>
                    <div className="relative bg-white overflow-hidden appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600">
                        <input className="hidden" type="file" id="file" multiple={false}/>
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <textarea
                            className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                            placeholder="Enter message"/>
                        <Input type="text" placeholder="Enter some tags"/>
                        <div className="hidden">
                            <div className="absolute z-40 left-0 mt-2 w-full">
                                <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                                    <div className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonPrimary label="Post"/>
            </div>
        </div>
    )
}