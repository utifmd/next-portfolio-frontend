import {configureStore, Store} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import thunk from "redux-thunk"
import browserApiMiddleware from "../middlewares/browserApi";
import restApiMiddleware from "../middlewares/restApi";
import reducer from "../reducers"
import {pagedFeed} from "@/actions/homeAction";

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
        createdAt: "Tarung bebas",
        demoUrl: "Tarung bebas",
        description: "Tarung bebas",
        iconUrl: "https://via.placeholder.com/150",
        id: "Tarung bebas 1",
        imageUrls: ["https://via.placeholder.com/150"],
        platform: "Tarung bebas",
        releasedUrl: "Tarung bebas",
        stack: ["manusia"],
        title: "Tarung bebas 1001",
        type: "IOS"
    },{
        createdAt: "Tarung bebas",
        demoUrl: "Tarung bebas 2",
        description: "Tarung bebas",
        iconUrl: "https://via.placeholder.com/150",
        id: "Tarung bebas 2",
        imageUrls: ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"],
        platform: "Tarung bebas",
        releasedUrl: "Tarung bebas",
        stack: ["manusia"],
        title: "Tarung bebas 1002",
        type: "IOS"
    },{
        createdAt: "Tarung bebas",
        demoUrl: "Tarung bebas 3",
        description: "Tarung bebas",
        iconUrl: "https://via.placeholder.com/150",
        id: "Tarung bebas 3",
        imageUrls: ["https://via.placeholder.com/150"],
        platform: "Tarung bebas",
        releasedUrl: "Tarung bebas",
        stack: ["manusia"],
        title: "Tarung bebas 1003",
        type: "IOS"
    },{
        createdAt: "Tarung bebas",
        demoUrl: "Tarung bebas 4",
        description: "Tarung bebas",
        iconUrl: "https://via.placeholder.com/150",
        id: "Tarung bebas 4",
        imageUrls: ["https://via.placeholder.com/150"],
        platform: "Tarung bebas",
        releasedUrl: "Tarung bebas",
        stack: ["manusia"],
        title: "Tarung bebas 1004",
        type: "IOS"
    },{
        createdAt: "Tarung bebas",
        demoUrl: "Tarung bebas",
        description: "Tarung bebas",
        iconUrl: "https://via.placeholder.com/150",
        id: "Tarung bebas 5",
        imageUrls: ["https://via.placeholder.com/150"],
        platform: "Tarung bebas",
        releasedUrl: "Tarung bebas",
        stack: ["manusia"],
        title: "Tarung bebas 1005",
        type: "IOS"
    },{
        createdAt: "Tarung bebas",
        demoUrl: "Tarung bebas",
        description: "Tarung bebas",
        iconUrl: "https://via.placeholder.com/150",
        id: "Tarung bebas 6",
        imageUrls: ["https://via.placeholder.com/150"],
        platform: "Tarung bebas",
        releasedUrl: "Tarung bebas",
        stack: ["manusia"],
        title: "Tarung bebas 1006",
        type: "IOS"
    },{
        createdAt: "Tarung bebas",
        demoUrl: "Tarung bebas",
        description: "Tarung bebas",
        iconUrl: "https://via.placeholder.com/150",
        id: "Tarung bebas 7",
        imageUrls: ["https://via.placeholder.com/150"],
        platform: "Tarung bebas",
        releasedUrl: "Tarung bebas",
        stack: ["manusia"],
        title: "Tarung bebas 1007",
        type: "IOS"
    },
]

export default mStore
