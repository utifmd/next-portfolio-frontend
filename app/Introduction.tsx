import {BtnNext} from "../components/Button";

const Introduction = ({title, description}: {
    title: string, description: string}) =>
    <div className="w-full px-0 sm:px-6 py-6">
        <div className="text-center space-y-7 py-28">
            <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase">{title}</p>
            <div className="flex justify-center">
                <div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/>
            </div>
            <p className="text-base">{description}</p>
        </div>
        <BtnNext onClick={() => {}}/>
    </div>
export default Introduction