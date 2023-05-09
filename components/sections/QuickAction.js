const App = ({xRef, user, handleMainScrolling, handleScrolling, dark, setDark}) => {
    return( 
    <section>
        <div ref={xRef} className="flex space-x-3 justify-center p-16 mb-6 uppercase">
        { user ? <>
            <div onClick={() => handleScrolling('FormProjects')} className="flex-1 cursor-pointer text-center group hover:opacity-70 focus:outline-none ease-linear transition-all duration-350">
                <box-icon name="briefcase" color="#059669"/>
                <p className="text-green-600">project</p>
            </div>
            <div onClick={() => handleScrolling('FormScholars')} className="flex-1 cursor-pointer text-center group hover:opacity-70 focus:outline-none ease-linear transition-all duration-350">
                <box-icon name="credit-card-front" color="#059669"/>
                <p className="text-green-600">scholar</p>
            </div> </>: null}
            <div onClick={() => handleMainScrolling(0)} className="flex-1 cursor-pointer text-center group hover:opacity-70 focus:outline-none ease-linear transition-all duration-350">
                <box-icon name="home" color="#059669"/>
                <p className="text-green-600">home</p>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <div className="flex items-center justify-center w-full mb-12">
                <label className="flex items-center space-x-4">
                    <box-icon name="sun" color={dark? '#F3F4F6': '#111827'}/>
                    <div className="relative">
                        <input type="checkbox" className="cursor-pointer sr-only focus:outline-none ease-linear transition-all duration-350"
                            defaultChecked={dark} 
                            onChange={() => setDark(!dark)} />
                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                    </div> 
                    <box-icon name="moon" color={dark? '#F3F4F6': '#111827'}/>
                </label>
            </div>
        </div>
    </section>
    )
}

export default App