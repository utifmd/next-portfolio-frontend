import {Box} from "../components/sections";
import Image from "next/image";
import {useEffect} from "react";
import {AppDispatch} from "../store";

type Props = {
    state: IEducationState, getAllEducations: () => AppDispatch
}
const Education = ({state, getAllEducations}: Props) => {
    useEffect(() => {
        getAllEducations()

    }, [getAllEducations])

    return (
        <div className="flex flex-col w-full">{state.value.map(education =>
            <Box title={education.title}>
                <div className="relative h-48 sm:h-[256px] mx-0 sm:mx-6">
                    <Image
                        className="object-cover rounded-md shadow-md cursor-pointer" layout="fill" objectFit="cover"
                        src={education.imageUrl} alt={education.title} loader={() => education.imageUrl}/>
                </div>
                <p className="text">{education.content}</p>
                <div className="flex justify-center space-x-4">
                    <a rel="noreferrer" target="_blank" className="p-3 cursor-pointer">
                        <box-icon color="#059669" name="credit-card-front"/>
                    </a>
                </div>
            </Box>)}
        </div>
    )
}
export default Education