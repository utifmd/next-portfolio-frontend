import {AppDispatch} from "@/store";

type Props = {
    state: IExperienceState, getAllExperience: () => AppDispatch
}
const Experiences = (/*{state}: Props*/) => {
    /*useEffect(() => {
        getAllExperience()

    }, [getAllExperience])*/

    return <div className="flex flex-col w-full">
        {/*{state.value.map(experience => <ExperienceItem experience={experience}/>)}*/}
    </div>
}
export default Experiences
