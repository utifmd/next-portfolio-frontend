import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function ({isLoading, onNextClick, onBottomClick}: TBoxProps){
    return(
        <div className="flex justify-center">
            <div onClick={onBottomClick || onNextClick}
                 className="rounded-full ring-1 ring-gray-900/5 h-16 w-16 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">

                {isLoading
                    ? <FontAwesomeIcon color={"#059669"} icon={faSpinner} spin={true} />
                    : <FontAwesomeIcon color={"#059669"} icon={onBottomClick ? faArrowUp : faArrowDown} />}
            </div>
        </div>
    )
}
