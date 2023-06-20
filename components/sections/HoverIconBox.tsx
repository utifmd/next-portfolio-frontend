import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    children: React.ReactNode,
    icons: [IconDefinition, IconDefinition],
    disabled?: boolean,
    onTLClick: (e: any) => void,
    onTRClick: (e: any) => void,
    onBlur?: (e: any) => void
}
export default function ({icons, children, disabled, onTLClick, onTRClick, onBlur}: Props) {
    return (
        <div className={`relative block group w-20 h-20 m-1 overflow-clip ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
            {children}
            <div className="relative hidden group-hover:block">
                <div className="flex justify-between">
                    <FontAwesomeIcon
                        className="m-2 drop-shadow-md"
                        icon={icons[0]}
                        color="#F2F2F2"
                        onClick={!disabled ? onTLClick : () => {}}
                        onBlur={onBlur}/>
                    <FontAwesomeIcon
                        className="m-2 drop-shadow-md"
                        icon={icons[1]}
                        color="#F2F2F2"
                        onClick={!disabled ? onTRClick : () => {}}
                        onBlur={onBlur}/>
                </div>
            </div>
        </div>
    )
}