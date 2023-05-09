import {BtnNext} from "../components/Button";

type Props = {
    title: string,
    subtitle: string,
    habits: {type: string, icon: string, label: string}[]
}
const Introduction = ({title, subtitle, habits}: Props) =>
    <div className="w-full py-6">
        <div className="p-6 text-center space-y-6 py-28">
            <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase text-gray-900 dark:text-gray-100">{title}</p>
            <div className="flex justify-center"><div className=" h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/></div>
            <p className="font-base text-gray-900 dark:text-gray-100 mb-6">{subtitle}</p>
            <div className="grid grid-cols-2 mx-0">
                { habits.length && habits.map((habit, index) =>
                    <div key={index} className="flex flex-col py-6 items-center justify-center text-center">
                        { habit.type
                            ? <box-icon name={habit.icon} type={habit.type}/>
                            : <box-icon name={habit.icon}/> }
                        <p className={`text-base truncate text-gray-900 dark:text-gray-100 uppercase font-bold tracking-widest mt-3.5`}>{habit.label}</p>
                    </div>
                )}
            </div>
        </div>
        <BtnNext onClick={() => {}} />
    </div>
export default Introduction
