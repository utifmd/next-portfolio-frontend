import Image from "next/image";
import {Box} from "../../components/sections";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from '@fortawesome/free-solid-svg-icons'

export default function(
    {education, isLoading, onNextClick, innerRef}: TBoxProps & {education: IEducation}) {
    return(
        <Box innerRef={innerRef}
            title={education.title}
            isLoading={isLoading}
            onNextClick={onNextClick}>
            <div className="relative h-48 sm:h-[256px] mx-0 sm:mx-6">
                <Image className="rounded-md shadow-md cursor-pointer" fill={true} style={{objectFit: "cover"}}
                   src={education.imageUrl} alt={education.title} loader={() => education.imageUrl}/>
            </div>
            <p className="text">{education.content}</p>
            <div className="flex justify-center space-x-4">
                <a className="p-3 cursor-pointer">
                    <FontAwesomeIcon color={"#059669"} icon={faExternalLink} />
                </a>
            </div>
        </Box>
    )
}