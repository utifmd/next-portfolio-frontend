import Image from "next/image";
import {Box} from "../../components/sections";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink, faEdit} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

type Props = TBoxProps & {
    education: IEducation,
    onEditIconClick: (e: any) => void
}
export default function(
    {education, isLoading, onNextClick, onEditIconClick, innerRef}: Props) {
    return(
        <Box innerRef={innerRef}
            title={education.title}
            isLoading={isLoading}
            onNextClick={onNextClick}>
            <div className="relative h-48 sm:h-[256px] mx-0 sm:mx-6">
                <Image className="object-cover rounded-md shadow-md cursor-pointer" fill={true} src={education.imageUrl} alt={education.title} loader={() => education.imageUrl}/>
            </div>
            <p className="text">{education.content}</p>
            <div className="flex justify-center space-x-4">
                <Link href={education.fileUrl} className="cursor-pointer">
                    <FontAwesomeIcon color={"#059669"} icon={faExternalLink} />
                </Link>
                <div className="cursor-pointer" onClick={onEditIconClick} >
                    <FontAwesomeIcon color={"#059669"} icon={faEdit}/>
                </div>
            </div>
        </Box>
    )
}