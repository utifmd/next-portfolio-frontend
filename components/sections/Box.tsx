import {BtnNext} from "../Button";

const Box = ({title, children, onNextClicked}: {
    title: string, onNextClicked: (e: MouseEvent) => void, children: React.ReactNode}) =>
    <div className="w-full space-y-6 py-24 justify-center text-center">
        <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase">{title}</p>
        <div className="flex justify-center">
            <div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/>
        </div>
        {children}
        <BtnNext onClick={onNextClicked}/>
    </div>
export default Box