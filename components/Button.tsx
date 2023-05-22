export const ButtonPrimary = ({label, onClick}: TBoxProps & { label: string }) =>
    <button onClick={onClick}
            className="w-[75%] sm:w-[50%] py-4 uppercase bg-green-600 font-bold text-white dark:text-white-200 active:bg-green-900 hover:bg-green-700 focus:outline-none ease-linear transition-all duration-350">{label || "Button"}
    </button>

export const ButtonNext = ({isLoading, onNextClick, onBottomClick}: TBoxProps) =>
    <div className="flex justify-center">
        <div onClick={onBottomClick || onNextClick}
             className="rounded-full ring-1 ring-gray-900/5 h-16 w-16 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
            {isLoading
                ? <box-icon color="#059669" name='loader' animation='spin'/>
                : <box-icon color="#059669" name={onBottomClick ? 'up-arrow-alt': 'down-arrow-alt'}/>}
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

/*
export const BtnHome = ({onHomeClicked}: {onHomeClicked?: (e: MouseEvent) => void}) =>
    <div className="flex justify-center mb-12">
        <button onClick={onHomeClicked} className="p-4 cursor-pointer text-center group hover:opacity-70">
            <box-icon name="home" color="#059669"/>
            <p className="text-green-600">Home</p>
        </button>
    </div>*/
