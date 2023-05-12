import {BtnNext} from '../components/Button'

type Props = {
    data: IExperience
}
const Experience = ({data}: Props) => {

    let attachmentKeys: [string, string] =
        data.platform === 'android' || data.platform === 'ios'
            ? ['Released apps', 'Download'] : ['Link address', 'Visit']

    return (
        <div className="w-full px-0 sm:px-6 py-6">
            <div className="text-center space-y-7 py-28">
                <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase">{data.title}</p>
                <div className="flex justify-center">
                    <div className=" h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/>
                </div>
                <div className="flex flex-wrap justify-center">
                    <img src={data.iconUrl} alt="cretive"
                         className="object-cover shadow-lg rounded-full w-48 h-48 align-middle border-none"/>
                </div>
                <div className="appearance-none bg-gray-200 dark:bg-gray-700 overflow-hidden sm:rounded-lg text-left">{/* <img className="object-cover h-48 w-full" src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-3-800x800.jpg" alt="cover" /> */}
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium">Application Information</h3>
                        <p className="mt-1 max-w-2xl text-sm">{data.description}</p>
                    </div>
                    <div className="border-t dark:border-gray-600 border-gray-300">
                        <dl>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium">Name</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{data.title}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                                <dt className="text-sm font-medium">Platform</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 uppercase">{data.type}</dd>
                            </div>
                            <div className="w-full h-auto px-4 py-4 flex flex-wrap border-t dark:border-gray-600 border-gray-300">
                                { data.stack?.map((v, i) =>
                                    <span key={i} className="py-1 px-4 mr-4 mt-2 text-xs rounded-full bg-gray-300 dark:bg-green-600">#{v}</span>
                                )}
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t dark:border-gray-600 border-gray-300">
                                <dt className="text-sm font-medium">Attachments</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                    <ul role="listitem" className="border border-gray-300 dark:border-gray-600 rounded-md divide-y divide-gray-300 dark:divide-gray-600">
                                        { data.imageUrls?.length ?
                                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div key="key1" className="w-0 flex-1 flex items-center">
                                                    {/*<box-icon color="#111827" name="image"/>*/}
                                                    <i className='bx bx-image'/>
                                                    <span className="ml-2 flex-1 w-0 truncate">Screenshot</span>
                                                </div>
                                                <div key="key2" className="ml-4 flex-shrink-0">
                                                    <div onClick={() => {}} className="font-medium text-green-600 hover:text-green-500 cursor-pointer">View</div>
                                                </div>
                                            </li> : null }
                                        { data.demoUrl?.length ?
                                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div key="key1" className="w-0 flex-1 flex items-center">
                                                    {/*<box-icon color="#111827" name="video"/>*/}
                                                    <i className='bx bx-video'/>
                                                    <span className="ml-2 flex-1 w-0 truncate">Demonstration</span>
                                                </div>
                                                <div key="key2" className="ml-4 flex-shrink-0">
                                                    <div onClick={() => {}} className="font-medium text-green-600 hover:text-green-500 cursor-pointer">View</div>
                                                </div>
                                            </li> : null }
                                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                {/*<box-icon color="#111827" name="link-external"/>*/}
                                                <i className="bx bx-link-external"/>
                                                <span className="ml-2 flex-1 w-0 truncate">{ attachmentKeys[0] }</span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href={data.releasedUrl} rel="noreferrer" target="_blank" className="font-medium text-green-600 hover:text-green-500">{ attachmentKeys[1] }</a>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                {/*{user ?
                    <div className="flex justify-center space-x-4">
                        <i onClick={() => dispatch(deleteProject(data._id))} className="p-3 cursor-pointer">
                            <box-icon color="#059669" name='trash'></box-icon>
                        </i>
                        <i onClick={onEditClick} className="p-3 cursor-pointer">
                            <box-icon color="#059669" name='edit'></box-icon>
                        </i>
                    </div> : null}*/}
            </div>
            <BtnNext onClick={() => {}}/>
        </div>)
}
export default Experience
