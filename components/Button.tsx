import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faSpinner} from "@fortawesome/free-solid-svg-icons";

export const ButtonPrimary = (
    {label, onClick, onBlur, isDisable, isLoading}: TBoxProps & {
        label: string, onClick?: (e: any) => void, onBlur?: (e: any) => void }) =>
    <button
        className={`w-[75%] sm:w-[50%] py-4 uppercase font-bold ease-linear transition-all duration-350 ${!isDisable ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none' : 'bg-gray-300 dark:bg-gray-700 text-gray'}`}
        disabled={isDisable} onClick={onClick} onBlur={onBlur}>
        <div className="flex justify-center items-center space-x-3">
            {isLoading && <FontAwesomeIcon color="gray" icon={faSpinner} spin={true} />}
            <div>{label || "Button"}</div>
        </div>
    </button>

export const ButtonNext = ({isLoading, onNextClick, onBottomClick}: TBoxProps) =>
    <div className="flex justify-center">
        <div onClick={onBottomClick || onNextClick}
             className="rounded-full ring-1 ring-gray-900/5 h-16 w-16 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">

            {isLoading
                ? <FontAwesomeIcon color={"#059669"} icon={faSpinner} spin={true} />
                : <FontAwesomeIcon color={"#059669"} icon={onBottomClick ? faArrowUp : faArrowDown} />}
        </div>
    </div>

export const RoundedButton = ({label, onClick}: { label: string, onClick: (e: any) => void }) =>
    <div className="rounded-full ring-1 ring-gray-900/5 h-20 w-20 px-2 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer text-sm uppercase text-green-600 font-medium"
        onClick={onClick}>
        {label}
    </div>

/*export const BtnCollapse = ({className, onClick}: { className: string, onClick: () => void }) =>
    <div className={className}>
        <div onClick={onClick}>
            <div
                className="rounded-full shadow mt-6 mx-6 h-16 w-16 flex items-center justify-center bg-gray-200 bg-opacity-30 hover:opacity-70 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
                {/!*<box-icon color="#059669" name='collapse'></box-icon>*!/}
                <i className="bx bx-collapse"/>
            </div>
        </div>
    </div>

export const BtnRight = ({className, onClick}: { className: string, onClick: () => void }) =>
    <div className={className}>
        <div onClick={onClick}>
            <div
                className="rounded-full shadow mt-6 mr-6 h-16 w-16 flex items-center justify-center bg-gray-200 bg-opacity-30 hover:opacity-70 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
                {/!*<box-icon color="#059669" name='chevron-right'></box-icon>*!/}
                <i className="bx bx-chevron-right"/>
            </div>
        </div>
    </div>

export const BtnLeft = ({className, onClick}: { className: string, onClick: () => void }) =>
    <div className={className}>
        <div onClick={onClick}>
            <div
                className="rounded-full shadow mt-6 mr-3 h-16 w-16 flex items-center justify-center bg-gray-200 bg-opacity-30 hover:opacity-70 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
                {/!*<box-icon color="#059669" name='chevron-left'></box-icon>*!/}
                <i className="bx bx-chevron-left"/>
            </div>
        </div>
    </div>*/
