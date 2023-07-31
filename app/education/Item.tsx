import Link from "next/link";
import {Image} from "@/components";
import {Box} from "@/components/sections";
import {Authenticated} from "@/app/authentication";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink, faCrosshairs} from '@fortawesome/free-solid-svg-icons'
import {SlideshowLightbox} from "lightbox.js-react";
import {capitalize} from "@/helpers";
import {useState} from "react";

type Props = TBoxProps & {
    education: IEducation,
    onTargetIconClick: (e: any) => void
}
export default function(
    {education, index, isLoading, onNextClick, onTargetIconClick, innerRef}: Props) {
    const images: TImageLightBox[] = [{alt: education.title, src: education.imageUrl}]
    const [
        isToggleContent,
        setIsToggleContent

    ] = useState<boolean>(true)
    return(
        <Box innerRef={innerRef}
            title={education.title}
            isLoading={isLoading}
            onNextClick={onNextClick}>
            <SlideshowLightbox className="relative h-48 sm:h-[256px] mx-0 sm:mx-6"
                lightboxIdentifier={`educationFigure-${index}`} framework="next" images={images}>
                <Image
                    className="object-cover rounded-md shadow-md"
                    data-lightboxjs={`educationFigure-${index}`}
                    source={education.imageUrl}
                    alt={education.title}/>
            </SlideshowLightbox>
            <p className="text" onClick={() => setIsToggleContent(!isToggleContent)}>{capitalize(isToggleContent ? education.content : education.desc)}</p>
            <div className="flex justify-center space-x-4">
                <Link href={education.fileUrl} className="cursor-pointer">
                    <FontAwesomeIcon color={"#059669"} icon={faExternalLink} />
                </Link>
                <Authenticated>
                    <div className="cursor-pointer" onClick={onTargetIconClick} >
                        <FontAwesomeIcon color={"#059669"} icon={faCrosshairs}/>
                    </div>
                </Authenticated>
            </div>
        </Box>
    )
}