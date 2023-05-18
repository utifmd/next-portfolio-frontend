export const ButtonPrimary = ({label, onClick}: TBoxProps & { label: string }) =>
    <button onClick={onClick}
            className="w-[75%] sm:w-[50%] py-4 uppercase bg-green-600 font-bold text-white dark:text-white-200 active:bg-green-900 hover:bg-green-700 focus:outline-none ease-linear transition-all duration-350">{label || "Button"}
    </button>

export const ButtonNext = ({isLoading, onClick}: TBoxProps) =>
    <div className="flex justify-center">
        <div onClick={onClick}
             className="rounded-full ring-1 ring-gray-900/5 h-16 w-16 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
            {isLoading //(i + 1) >= feedLength
                ? <box-icon color={isLoading ? '#ADADAD' :'#059669'} name='loader' animation='spin'/>
                : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-green-600"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>}
        </div>
    </div>

export const BtnCollapse = ({className, onClick}: { className: string, onClick: () => void }) =>
    <div className={className}>
        <div onClick={onClick}>
            <div
                className="rounded-full shadow mt-6 mx-6 h-16 w-16 flex items-center justify-center bg-gray-200 bg-opacity-30 hover:opacity-70 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
                {/*<box-icon color="#059669" name='collapse'></box-icon>*/}
                <i className="bx bx-collapse"/>
            </div>
        </div>
    </div>

export const BtnRight = ({className, onClick}: { className: string, onClick: () => void }) =>
    <div className={className}>
        <div onClick={onClick}>
            <div
                className="rounded-full shadow mt-6 mr-6 h-16 w-16 flex items-center justify-center bg-gray-200 bg-opacity-30 hover:opacity-70 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
                {/*<box-icon color="#059669" name='chevron-right'></box-icon>*/}
                <i className="bx bx-chevron-right"/>
            </div>
        </div>
    </div>

export const BtnLeft = ({className, onClick}: { className: string, onClick: () => void }) =>
    <div className={className}>
        <div onClick={onClick}>
            <div
                className="rounded-full shadow mt-6 mr-3 h-16 w-16 flex items-center justify-center bg-gray-200 bg-opacity-30 hover:opacity-70 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
                {/*<box-icon color="#059669" name='chevron-left'></box-icon>*/}
                <i className="bx bx-chevron-left"/>
            </div>
        </div>
    </div>