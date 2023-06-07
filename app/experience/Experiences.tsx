import {AppDispatch} from "@/store";
import {ExperienceItem} from "./index";

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
