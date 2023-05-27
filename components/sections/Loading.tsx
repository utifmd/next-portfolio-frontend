import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function() {
    return(
        <div className="flex min-h-screen justify-center items-center">
            <FontAwesomeIcon color={"#059669"} icon={faSpinner} spin={true} />
        </div>
    )
}