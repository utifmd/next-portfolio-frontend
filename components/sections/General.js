import { useDispatch } from 'react-redux'
import { BtnNext } from '../button'

const App = ({ user, data, setDetailImage, onEditClick, deleteScholar, xRef, xKey, maxKey, handleScrolling, handleMainScrolling }) => { 
    const dispatch = useDispatch()
    //console.log(data);
return (
    <div key={xKey} className="py-6">
        <div className="h-px bg-gray-200 dark:bg-gray-800" />
        <div ref={xRef} className="p-6 text-center space-y-7 py-28">
            <p className="font-bold xl:text-3xl md:text-3xl text-2xl uppercase text-gray-900 dark:text-gray-100">{data?.title}</p>
            <div className="flex justify-center"><div className=" h-0.5 w-24 bg-gray-900 dark:bg-gray-100"/></div>
            <div className="cursor-pointer" onClick={() => setDetailImage({src: data?.fileUrl})}>
                <img className="object-cover h-48 w-full rounded-md shadow-md" src={data?.fileUrl} alt="general row" />
                {/* <LazyLoadImage
                    alt={data?.title}
                    height={48}
                    src={data?.fileUrl} /> */}
            </div>
            <p className="font-base text-gray-900 dark:text-gray-100">{data?.body}</p>
            <div className="flex justify-center space-x-4">
            { user? <>
                <i onClick={() => dispatch(deleteScholar(data._id))} className="p-3 cursor-pointer"><box-icon color="#059669" name='trash'></box-icon></i>
                <i onClick={onEditClick} className="p-3 cursor-pointer"><box-icon color="#059669" name='edit'></box-icon></i></>: null }
            { data.source? 
                <a href={data.source} rel="noreferrer" target="_blank" className="p-3 cursor-pointer"><box-icon color="#059669" name="credit-card-front"></box-icon></a> : null }
            </div> 
        </div>
        <BtnNext onClick={() => xKey >= maxKey
            ? handleMainScrolling(3)
            : handleScrolling(`RowGeneral${xKey}`)} />
    </div> )}
export default App