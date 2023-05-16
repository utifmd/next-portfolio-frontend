import {configureStore, Store} from "@reduxjs/toolkit";
import reducer from "../reducers"
import thunk from "redux-thunk"
import restApiMiddleware from "../middlewares/restApi";
import {AnyAction} from "redux";

const mStore: Store<IAppState, TDispatchApp> & {
    dispatch: TDispatchApp

} & Store<IEducationState, TDispatchEducation> & {
    dispatch: TDispatchEducation

} & Store<IExperienceState, TDispatchExperience> & {
    dispatch: TDispatchExperience

} = configureStore({
    reducer, middleware: [thunk, restApiMiddleware]
})
export type AppDispatch = ReturnType<typeof mStore.dispatch>
export type AppState = typeof mStore.getState
export type TAnyAction = AnyAction & {payload?: any}

export default mStore
