import {configureStore, Store} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import thunk from "redux-thunk"
import {restApiMiddleware, browserApiMiddleware} from "../middlewares";
import reducer from "../reducers"
import {pagedFeed} from "@/actions";

const mStore: Store<IAppState, any> = configureStore({
    reducer, middleware: [
        thunk,
        restApiMiddleware,
        browserApiMiddleware
    ]
})
mStore.dispatch(pagedFeed())

export type AppDispatch = typeof mStore.dispatch
export type AppState = ReturnType<typeof mStore.getState>
// export type TAppAction = (dispatch: AppDispatch, getState?: () => IAppState) => AnyAction
export type TAnyAction = AnyAction & {payload?: any}

export const educationsData: IEducation[] = [
    {
        id: "PID-1001",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1001",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1002",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1002",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1003",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1003",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1004",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1004",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1005",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1005",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1006",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1006",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1007",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1007",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    }
]

export const experiencesData: IExperience[] = [
    {
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "https://via.placeholder.com/150",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1001",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "https://via.placeholder.com/150",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1002",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "https://via.placeholder.com/150",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1003",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "https://via.placeholder.com/150",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1004",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "https://via.placeholder.com/150",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1005",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "https://via.placeholder.com/150",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1006",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "https://via.placeholder.com/150",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1007",
        type: "IOS"
    },
]

export default mStore
