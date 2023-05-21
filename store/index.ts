import {configureStore, Store} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import thunk from "redux-thunk"
import restApiMiddleware from "../middlewares/restApi";
import reducer from "../reducers"

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

export const educationsData: IEducation[] = [
    {
        id: "PID-1001",
        fileUrl: "",
        content: "Ini content 1001",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1002",
        fileUrl: "",
        content: "Ini content 1002",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1003",
        fileUrl: "",
        content: "Ini content 1003",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1004",
        fileUrl: "",
        content: "Ini content 1004",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1005",
        fileUrl: "",
        content: "Ini content 1005",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1006",
        fileUrl: "",
        content: "Ini content 1006",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1007",
        fileUrl: "",
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
