import React from "react";
import {AppDispatch} from "@/store";

type Props = {
    state: IEducationState, getMorelEducations: () => AppDispatch
}
const Educations = ({state, getMorelEducations}: Props) => {
    /*useEffect(() => getAllEducations(), [getAllEducations])*/
    /*const [loading, setLoading] = useState(false)
    useEffect(() => {
        Router.events.on("routeChangeStart", () => {setLoading(true)})
        return () => {
            Router.events.off("routeChangeStart", () => {setLoading(false)})
        }
    }, [Router.events])*/
    const onEducationNextClicked = (e: MouseEvent) => (educationLength: number, i: number) => {
        e.preventDefault()
        if((i +1) >= educationLength) getMorelEducations()
    }
    return (
        <div className="flex flex-col w-full">{/*state.value.map((education, i) =>
            <EducationItem
                education={education}
                onClicked={e => onEducationNextClicked(e)(state.value.length, i)} />)*/}
        </div>
    )
}
export default Educations