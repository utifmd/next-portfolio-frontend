import {Box} from "@/components/sections";
import {faLaptop, faLayerGroup, faMobilePhone, faServer, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = TTileProps & TBoxProps
const Habit = ({innerRef, title, description, onNextClick, isLoading}: Props) =>
    <Box innerRef={innerRef} title={title} onNextClick={onNextClick} isLoading={isLoading}>
        <p className="font-base px-0 sm:px-6">{description}</p>
        <div className="grid grid-cols-2 mx-0">
            <div className="flex flex-col py-6 items-center justify-center text-center">
                <FontAwesomeIcon color="#16a34a" icon={faLayerGroup} size="3x" />
                <p className={`text-base truncate uppercase font-bold tracking-widest mt-3.5`}>Frontend</p>
            </div>
            <div className="flex flex-col py-6 items-center justify-center text-center">
                <FontAwesomeIcon color="#16a34a" icon={faServer} size="3x" />
                <p className={`text-base truncate uppercase font-bold tracking-widest mt-3.5`}>Backend</p>
            </div>
            <div className="flex flex-col py-6 items-center justify-center text-center">
                <FontAwesomeIcon color="#16a34a" icon={faMobilePhone} size="3x" />
                <p className={`text-base truncate uppercase font-bold tracking-widest mt-3.5`}>Android</p>
            </div>
            <div className="flex flex-col py-6 items-center justify-center text-center">
                <FontAwesomeIcon color="#16a34a" icon={faLaptop} size="3x" />
                <p className={`text-base truncate uppercase font-bold tracking-widest mt-3.5`}>XPlatform</p>
            </div>
        </div>
    </Box>
export default Habit
