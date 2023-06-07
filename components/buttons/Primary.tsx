import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

type Props = TBoxProps & {
    label: string,
    onClick?: (e: any) => void,
    onBlur?: (e: any) => void, 
    type?: "submit" | "reset" | "button"
}
export default function({label, type, onClick, onBlur, isDisable, isLoading}: Props){
    return(
        <button
            className={`w-[75%] sm:w-[50%] py-4 uppercase font-bold ease-linear transition-all duration-350 ${!isDisable ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none' : 'bg-gray-300 dark:bg-gray-700 text-gray'}`}
            type={type} disabled={isDisable} onClick={onClick} onBlur={onBlur}>
            <div className="flex justify-center items-center space-x-3">
                {isLoading && <FontAwesomeIcon color="gray" icon={faSpinner} spin={true} />}
                <div className="px-3 truncate">{label || "Button"}</div>
            </div>
        </button>
    )
}