const QuickAction = ({onHomeClicked}: {onHomeClicked?: (e: MouseEvent) => void}) => {
    return( 
    <section className="flex flex-col w-full">
        <div className="flex space-x-2 justify-center mb-12">
            <button onClick={() => {}} className="px-4 py-1 cursor-pointer text-center group hover:opacity-70">
                <box-icon name="briefcase" color="#059669"/>
                <p className="text-green-600">Experiences</p>
            </button>
            <button onClick={onHomeClicked} className="px-4 cursor-pointer text-center group hover:opacity-70">
                <box-icon name="home" color="#059669"/>
                <p className="text-green-600">Home</p>
            </button>
            <button onClick={() => {}} className="px-4 cursor-pointer text-center group hover:opacity-70">
                <box-icon name="credit-card-front" color="#059669"/>
                <p className="text-green-600">Educations</p>
            </button>
        </div>
        <div className="flex justify-center items-center">
            <div className="flex items-center justify-center w-full mb-12">
                <label className="flex items-center space-x-4">
                    <box-icon name="sun" color={'#F3F4F6'/*{dark? '#F3F4F6': '#111827'}*/}/>
                    <div className="relative">
                        <input type="checkbox" className="cursor-pointer sr-only"
                            // defaultChecked={dark}
                            onChange={() => {}} />
                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"/>
                        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"/>
                    </div> 
                    <box-icon name="moon" color={'#F3F4F6'/*{dark? '#F3F4F6': '#111827'}*/}/>
                </label>
            </div>
        </div>
    </section>
    )
}
export default QuickAction