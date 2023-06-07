import Image from "next/image";
import Link from "next/link";
import {Box} from "@/components/sections";
import {Authenticated} from "@/app/authentication";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink, faEdit} from '@fortawesome/free-solid-svg-icons'
import {SlideshowLightbox} from "lightbox.js-react";

type Props = TBoxProps & {
    education: IEducation,
    onEditIconClick: (e: any) => void
}
export default function(
    {education, index, isLoading, onNextClick, onEditIconClick, innerRef}: Props) {
    const images: TImageLightBox[] = [{alt: education.title, src: education.imageUrl}]
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
                    fill={true}
                    src={education.imageUrl}
                    alt={education.title}
                    quality={80}
                    loader={() => education.imageUrl}/>
            </SlideshowLightbox>
            <p className="text">{education.content}</p>
            <div className="flex justify-center space-x-4">
                <Link href={education.fileUrl} className="cursor-pointer">
                    <FontAwesomeIcon color={"#059669"} icon={faExternalLink} />
                </Link>
                <Authenticated>
                    <div className="cursor-pointer" onClick={onEditIconClick} >
                        <FontAwesomeIcon color={"#059669"} icon={faEdit}/>
                    </div>
                </Authenticated>
            </div>
        </Box>
    )
}