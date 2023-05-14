import {configureStore, Store} from "@reduxjs/toolkit";
// import reducer from "../reducers"
import reducer from "../reducers/educationReducer";
import thunk from "redux-thunk"

const mStore: Store<IEducationState, TDispatchEducation> & {
    dispatch: TDispatchEducation

} = configureStore({
    reducer, middleware: [thunk/*, restApi*/]
})
export type AppDispatch = ReturnType<typeof mStore.dispatch>
export type AppState = typeof mStore.getState
export default mStore
/*
const mStore: Store<IAppState, TDispatchApp> & {
    dispatch: TDispatchApp

} = configureStore({
    reducer, middleware: [thunk/!*, restApi*!/]
})
export default mStore*/
