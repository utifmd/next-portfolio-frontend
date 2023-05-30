import Image from "next/image";
import Link from "next/link";
import {attachmentKeys} from "@/utils";
import {Box} from "../../components/sections";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExternalLink} from "@fortawesome/free-solid-svg-icons";
type Props = TBoxProps & {
    experience: IExperience,
    onEditIconClick: (e: any) => void
}
export default function(
    {experience, isLoading, onBottomClick, onNextClick, onEditIconClick, innerRef}: Props) {
    return(
        <Box title={experience.title}
             isLoading={isLoading}
             onNextClick={onNextClick}
             onBottomClick={onBottomClick}
             innerRef={innerRef}>

            <div className="flex flex-wrap justify-center">
                <div className="relative w-48 h-48">
                    <Image className="object-cover w-full shadow-lg rounded-full align-middle border-none cursor-pointer"
                           fill={true} src={experience.iconUrl} alt={experience.title} loader={() => experience.iconUrl}/>
                </div>
            </div>
            <div className="appearance-none mx-0 sm:mx-6 bg-gray-200 dark:bg-gray-700 overflow-hidden sm:rounded-lg text-left">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium">Application Information</h3>
                    <p className="mt-1 max-w-2xl text-sm">{experience.description}</p>
                </div>
                <div className="border-t dark:border-gray-600 border-gray-300">
                    <dl>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium">Name</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{experience.title}</dd>
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                            <dt className="text-sm font-medium">Platform</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 uppercase">{experience.type}</dd>
                        </div>
                        <div className="w-full h-auto px-4 py-4 flex flex-wrap border-t dark:border-gray-600 border-gray-300">{experience.stack?.map((v, i) =>
                            <span key={i} className="py-1 px-4 mr-4 mt-2 text-xs rounded-full bg-gray-300 dark:bg-green-600">#{v}</span>)}
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                            <dt className="text-sm font-medium">Attachments</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <ul role="listitem" className="border border-gray-300 dark:border-gray-600 rounded-md divide-y divide-gray-300 dark:divide-gray-600">{experience.imageUrls?.length ?
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div key="key1" className="w-0 flex-1 flex items-center">
                                            <i className='bx bx-image'/>
                                            <span className="ml-2 flex-1 w-0 truncate">Screenshot</span>
                                        </div>
                                        <div key="key2" className="ml-4 flex-shrink-0">
                                            <div onClick={() => {}} className="font-medium text-green-600 hover:text-green-500 cursor-pointer">View</div>
                                        </div>
                                    </li>: null}{ experience.demoUrl?.length ?
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div key="key1" className="w-0 flex-1 flex items-center"> {/*<box-icon color="#111827" name="video"/>*/}
                                            <i className='bx bx-video'/>
                                            <span className="ml-2 flex-1 w-0 truncate">Demonstration</span>
                                        </div>
                                        <div key="key2" className="ml-4 flex-shrink-0">
                                            <div onClick={() => {}} className="font-medium text-green-600 hover:text-green-500 cursor-pointer">View</div>
                                        </div>
                                    </li>: null}
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <i className="bx bx-link-external"/>
                                            <span className="ml-2 flex-1 w-0 truncate">{ attachmentKeys(experience.platform)[0] }</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <Link href={experience.releasedUrl} rel="noreferrer" target="_blank" className="font-medium text-green-600 hover:text-green-500">{ attachmentKeys(experience.platform)[1] }</Link>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="flex justify-center space-x-4">
                <div className="cursor-pointer" onClick={onEditIconClick} >
                    <FontAwesomeIcon color={"#059669"} icon={faEdit}/>
                </div>
            </div>
        </Box>
    )
}