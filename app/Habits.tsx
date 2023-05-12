import {BtnNext} from "../components/Button";

type Props = {
    title: string,
    subtitle: string,
    items: { type: string, icon: string, label: string }[]
}
const Habits = ({title, subtitle, items}: Props) =>
    <div className="w-full px-0 sm:px-6 py-6">
        <div className="text-center space-y-6 py-28">
            <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase">{title}</p>
            <div className="flex justify-center">
                <div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/>
            </div>
            <p className="font-base mb-6">{subtitle}</p>
            <div className="grid grid-cols-2 mx-0">
                {items.length && items.map((habit, index) =>
                    <div key={index} className="flex flex-col py-6 items-center justify-center text-center"> {
                        <box-icon name={habit.icon} type={habit.type} color="#16a34a"/>}
                        <p className={`text-base truncate uppercase font-bold tracking-widest mt-3.5`}>{habit.label}</p>
                    </div>
                )}
            </div>
        </div>
        <BtnNext onClick={() => {}}/>
    </div>
export default Habits
