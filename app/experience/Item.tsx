import Link from "next/link";
import {Authenticated} from "@/app/authentication";
import {Image} from "@/components";
import {Box} from "@/components/sections";
import {SlideshowLightbox} from "lightbox.js-react";
import {attachmentKeys, capitalize} from "@/helpers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrosshairs, faExternalLink, faVideo} from "@fortawesome/free-solid-svg-icons";

type Props = TBoxProps & {
    experience: IExperience,
    onTargetIconClick: (e: any) => void
}
export default function (
    {experience, index, isLoading, onBottomClick, onNextClick, onTargetIconClick, innerRef}: Props) {
    const screenshots: TImageLightBox[] = experience.imageUrls
        ? experience.imageUrls?.map(url => ({alt: url, src: url})) : []

    return (
        <Box title={experience.title}
             isLoading={isLoading}
             onNextClick={onNextClick}
             onBottomClick={onBottomClick}
             innerRef={innerRef}>

            <div className="flex flex-wrap justify-center">
                <div className="relative w-48 h-48">
                    <Image
                        className="object-cover w-full shadow-lg rounded-full align-middle border-none"
                        source={experience.iconUrl}
                        alt={experience.title}/>
                </div>
            </div>
            <div
                className="appearance-none mx-0 sm:mx-6 bg-gray-200 dark:bg-gray-700 overflow-hidden sm:rounded-lg text-left">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium truncatetruncatetruncate">Application Information</h3>
                    <p className="mt-1 max-w-2xl text-sm">{capitalize(experience.description)}</p>
                </div>
                <div className="border-t dark:border-gray-600 border-gray-300">
                    <dl>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium truncatetruncatetruncate">Name</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-3">{capitalize(experience.title)}</dd>
                        </div>
                        <div
                            className="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                            <dt className="text-sm font-medium truncate">Platform</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-3 uppercase font-bold">{experience.platform} {experience.type}</dd>
                        </div>
                        <div
                            className="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                            <dt className="text-sm font-medium truncate">Tech stack</dt>
                            <dd className="flex flex-wrap mt-1 text-sm sm:mt-0 sm:col-span-3">{experience.stack.map((v, i) =>
                                <span key={i}
                                      className="py-1 px-2 my-0.5 mx-0.5 text-xs rounded-full bg-gray-300 dark:bg-green-600">#{v}</span>)}</dd>
                        </div>
                        {experience.imageUrls &&
                            <div className="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                                <dt className="text-sm font-medium truncate">Screenshots</dt>
                                <dd className="flex overflow-x-scroll mt-1 text-sm sm:mt-0 sm:col-span-3">
                                    <SlideshowLightbox
                                        className="flex space-x-1.5"
                                        lightboxIdentifier={`experienceFigure-${index}`}
                                        framework="next"
                                        images={screenshots}>
                                        {screenshots.map((shot, i) =>
                                            <div key={i} className="relative w-10 h-10">
                                                <Image
                                                    className="object-cover rounded-md shadow-md"
                                                    data-lightboxjs={`experienceFigure-${index}`}
                                                    source={shot.src}
                                                    alt={shot.alt}/>
                                            </div>)}
                                    </SlideshowLightbox>
                                </dd>
                            </div>}
                        <div
                            className="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                            <dt className="text-sm font-medium">Attachments</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-3">
                                <ul role="listitem"
                                    className="border border-gray-300 dark:border-gray-600 rounded-md divide-y divide-gray-300 dark:divide-gray-600">
                                    {experience.demoUrl &&
                                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div key="key1" className="w-0 flex-1 flex items-center"> {/*<box-icon color="#111827" name="video"/>*/}
                                                <FontAwesomeIcon icon={faVideo}/>
                                                <span className="ml-2 flex-1 w-0 truncate">Demo</span>
                                            </div>
                                            <div key="key2" className="ml-4 flex-shrink-0">
                                                <Link href={experience.demoUrl} target="_blank"
                                                      className="font-medium text-green-600 hover:text-green-500">View</Link>
                                            </div>
                                        </li>}
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={faExternalLink} />
                                            <span
                                                className="ml-2 truncate">{attachmentKeys(experience.platform)[0]}
                                            </span>
                                        </div>
                                        <Link className="font-medium text-green-600 hover:text-green-500" href={experience.releasedUrl} target="_blank">{attachmentKeys(experience.platform)[1]}</Link>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <Authenticated>
                <div className="flex justify-center space-x-4">
                    <div className="cursor-pointer" onClick={onTargetIconClick}>
                        <FontAwesomeIcon color={"#059669"} icon={faCrosshairs}/>
                    </div>
                </div>
            </Authenticated>
        </Box>
    )
}