import Image from "next/image";
import {SlideshowLightbox} from "lightbox.js-react"

export default function FigurePreview() {
    /*const assignLightBox = () => {
        initLightboxJS("", "")
    }
    useEffect(assignLightBox, [])*/

    const images = [
        {
            src: 'https://source.unsplash.com/sQZ_A17cufs/549x711',
            alt: 'Mechanical keyboard with white keycaps.',
        },
        {
            src: 'https://source.unsplash.com/rsAeSMzOX9Y/768x512',
            alt: 'Mechanical keyboard with white, pastel green and red keycaps.',
        },
        {
            src: 'https://source.unsplash.com/Z6SXt1v5tP8/768x512',
            alt: 'Mechanical keyboard with white, pastel pink, yellow and red keycaps.',
        }
    ]

    return (
        <div className="flex min-h-screen">
            <SlideshowLightbox
                lightboxIdentifier="lightbox1" framework="next" images={images}>{images[0] &&
                <Image
                    className="object-contain"
                    loader={() => images[0].src}
                    src={images[0].src}
                    alt={images[0].alt}
                    fill={true}
                    data-lightboxjs="lightbox1"
                    quality={80} />}
            </SlideshowLightbox>
        </div>
    )
}