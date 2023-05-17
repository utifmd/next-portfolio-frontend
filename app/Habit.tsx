import {Box} from "../components/sections";

type Props = TBoxProps & {
    items: { type: string, icon: string, label: string }[]
}
const Habit = ({innerRef, title, description, items, onClick}: Props) =>
    <Box innerRef={innerRef} title={title} onClick={onClick}>
        <p className="font-base px-0 sm:px-6">{description}</p>
        <div className="grid grid-cols-2 mx-0">
            {items.length && items.map((habit, index) =>
                <div key={index} className="flex flex-col py-6 items-center justify-center text-center"> {
                    <box-icon name={habit.icon} type={habit.type} color="#16a34a"/>}
                    <p className={`text-base truncate uppercase font-bold tracking-widest mt-3.5`}>{habit.label}</p>
                </div>
            )}
        </div>
    </Box>
export default Habit
