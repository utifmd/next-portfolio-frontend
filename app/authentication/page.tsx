import {ButtonPrimary} from "../../components/Button";
import {Input} from "../../components";

export default function () {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="w-full sm:w-[50%] p-6 text-center space-y-7">
                <p className="font-bold text-3xl uppercase text-gray-900 dark:text-gray-100">Sign in</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div className="md:col-span-2">
                        <Input type="text" placeholder="Enter email"/>
                    </div>
                    <div className="md:col-span-2">
                        <Input type="text" placeholder="Enter password"/>
                    </div>
                </div>
                <ButtonPrimary label="Login"/>
            </div>
        </div>
    )
}