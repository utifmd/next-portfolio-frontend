import {Box} from "@/components/sections";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = TTileProps & TBoxProps & {
    items: {icon: IconDefinition, label: string}[]
}
const Habit = ({innerRef, title, description, items, onNextClick, isLoading}: Props) =>
    <Box innerRef={innerRef} title={title} onNextClick={onNextClick} isLoading={isLoading}>
        <p className="font-base px-0 sm:px-6">{description}</p>
        <div className="grid grid-cols-2 mx-0">
            {items.length && items.map((habit, index) =>
                <div key={index} className="flex flex-col py-6 items-center justify-center text-center"> {
                    <FontAwesomeIcon color={"#16a34a"} icon={habit.icon} size="3x" />}
                    <p className={`text-base truncate uppercase font-bold tracking-widest mt-3.5`}>{habit.label}</p>
                </div>
            )}
        </div>
    </Box>
export default Habit
