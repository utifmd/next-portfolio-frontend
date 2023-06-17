import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    children: React.ReactNode,
    icon: IconDefinition,
    disabled?: boolean,
    onClick: (e: any) => void,
    onBlur?: (e: any) => void
}
export default function ({icon, children, disabled, onClick, onBlur}: Props) {
    return (
        <div className={`relative block group w-20 h-20 overflow-clip ${disabled ? 'opacity-50' : 'cursor-pointer'}`} onClick={!disabled ? onClick : () => {}} onBlur={onBlur}>
            {children}
            <FontAwesomeIcon className="relative mt-2 opacity-0 group-hover:opacity-100 bg-green-600 p-1 rounded-md" icon={icon} color="#F2F2F2"/>
        </div>
    )
}