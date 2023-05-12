import { BtnNext } from '../components/Button'
type Props = {
    data: IEducation
}
const Education = ({ data }: Props) => {
return (
    <div className="w-full px-0 sm:px-6 py-6">
        <div className="text-center space-y-7 py-28">
            <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase">{data.title}</p>
            <div className="flex justify-center"><div className="h-0.5 w-24 bg-gray-700 dark:bg-gray-300"/></div>
            <div className="cursor-pointer" onClick={() => {}}>
                <img className="object-cover h-48 w-full rounded-md shadow-md" src={data.imageUrl}  alt={data.title}/>
            </div>
            <p className="text">{data.content}</p>
            <div className="flex justify-center space-x-4">
            {/*{ user? <>
                <i onClick={() => {}} className="p-3 cursor-pointer"><box-icon color="#059669" name='trash'/></i>
                <i onClick={() => {}} className="p-3 cursor-pointer"><box-icon color="#059669" name='edit'/></i></>: null }
            { data.source? */}
                <a rel="noreferrer" target="_blank" className="p-3 cursor-pointer"><box-icon color="#059669" name="credit-card-front"/></a> {/*: null }*/}
            </div>
        </div>
        <BtnNext onClick={() => {}} />
    </div> )}
export default Education