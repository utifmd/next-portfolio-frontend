import {Box} from "../components/sections";
import Image from "next/image";
import React from "react";
import {AppDispatch} from "../store";

type Props = {
    state: IEducationState, getMorelEducations: () => AppDispatch
}
const Education = ({state, getMorelEducations}: Props) => {
    /*useEffect(() => getAllEducations(), [getAllEducations])*/

    const onEducationNextClicked = (e: MouseEvent) => (educationLength: number, i: number) => {
        e.preventDefault()
        if((i +1) >= educationLength) getMorelEducations()
    }
    return (
        <div className="flex flex-col w-full">{state.value.map((education, i) =>
            <EducationItem
                education={education}
                onClicked={e => onEducationNextClicked(e)(state.value.length, i)} />)}
        </div>
    )
}
export function EducationItem ({education, onClick, innerRef}: TBoxProps & {education: IEducation}) {
    return(
        <Box title={education.title} onClick={onClick} innerRef={innerRef}>
            <div className="relative h-48 sm:h-[256px] mx-0 sm:mx-6">
                <Image
                    className="object-cover rounded-md shadow-md cursor-pointer" layout="fill" objectFit="cover"
                    src={education.imageUrl} alt={education.title} loader={() => education.imageUrl}/>
            </div>
            <p className="text">{education.content}</p>
            <div className="flex justify-center space-x-4">
                <a className="p-3 cursor-pointer">
                    <box-icon color="#059669" name="credit-card-front"/>
                </a>
            </div>
        </Box>
    )
}
export default Education