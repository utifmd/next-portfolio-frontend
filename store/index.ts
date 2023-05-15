import {configureStore, Store} from "@reduxjs/toolkit";
import reducer from "../reducers"
import thunk from "redux-thunk"

const mStore: Store<IAppState, TDispatchApp> & {
    dispatch: TDispatchApp

} & Store<IEducationState, TDispatchEducation> & {
    dispatch: TDispatchEducation

} & Store<IExperienceState, TDispatchExperience> & {
    dispatch: TDispatchExperience

} = configureStore({
    reducer, middleware: [thunk/*, restApi*/]
})
export type AppDispatch = ReturnType<typeof mStore.dispatch>
export type AppState = typeof mStore.getState

export default mStore
