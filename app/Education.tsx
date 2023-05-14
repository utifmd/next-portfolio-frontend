import {BtnNext} from '../components/Button'
import Image from "next/image"

type Props = {
    data: IEducation
}
const Education = ({data}: Props) => {
    return (
        <div className="flex flex-col w-full">{[1, 2, 5].map(() =>
            <div className="space-y-6 py-24 justify-center text-center">
                <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase">{data.title}</p>
                <div className="flex justify-center">
                    <div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/>
                </div>
                <div className="relative h-48 sm:h-[256px] mx-0 sm:mx-6">
                    <Image
                        className="object-cover rounded-md shadow-md cursor-pointer" layout="fill" objectFit="cover"
                        src={data.imageUrl} alt={data.title} loader={() => data.imageUrl}/>
                </div>
                <p className="text">{data.content}</p>
                <div className="flex justify-center space-x-4">
                    <a rel="noreferrer" target="_blank" className="p-3 cursor-pointer">
                        <box-icon color="#059669" name="credit-card-front"/>
                    </a>
                </div>
                <BtnNext/>
            </div>)}
        </div>
    )
}
export default Education