import {configureStore, Store} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import thunk from "redux-thunk"
import browserApiMiddleware from "../middlewares/browserApi";
import restApiMiddleware from "../middlewares/restApi";
import reducer from "../reducers"

const store: Store<IAppState, any> = configureStore({
    reducer, /*preloadedState,*/ middleware: [
        thunk,
        restApiMiddleware,
        browserApiMiddleware
    ]
})
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export type TAnyAction = AnyAction & {payload?: any}

export default store
