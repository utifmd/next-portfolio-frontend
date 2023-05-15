import {AppDispatch} from "../store";
import {AnyAction} from "redux";

let page: number = 0, size: number = 2

export const pagedFeed = () => (dispatch, getState): AppDispatch => {
    const educations: IEducation[] = [
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
    const experiences: IExperience[] = [
        {
            createdAt: "Hati mana jatuh",
            demoUrl: "Hati mana jatuh",
            description: "Hati mana jatuh",
            iconUrl: "Hati mana jatuh",
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
            iconUrl: "Hati mana jatuh",
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
            iconUrl: "Hati mana jatuh",
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
            iconUrl: "Hati mana jatuh",
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
            iconUrl: "Hati mana jatuh",
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
            iconUrl: "Hati mana jatuh",
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
            iconUrl: "Hati mana jatuh",
            id: "Hati mana jatuh",
            imageUrls: ["manusia"],
            platform: "Hati mana jatuh",
            releasedUrl: "Hati mana jatuh",
            stack: ["manusia"],
            title: "Hati mana jatuh 1007",
            type: "IOS"
        },
    ]

    let response: ISchema[] = educations.slice(page, page + size)
    if (!response.length) {
        page = 0
        response = experiences.slice(page, page + size)
    }
    page += size
    console.log(`page ${page} size ${size}`)
    const action: AnyAction = {
        type: AppAction.PAGED_FEED_SUCCESS, payload: response
    }
    return dispatch(action)
}

export const getFeed = () => (dispatch, getState): AppDispatch => {
    const response: ISchema[] = [
        {
            id: "PID-1001",
            fileUrl: "",
            content: "Ini content 1001",
            createdAt: "A minute ago",
            desc: "Ini description",
            imageUrl: "https://via.placeholder.com/150",
            title: "Ini Judul"
        },{
            id: "PID-1002",
            fileUrl: "",
            content: "Ini content 1002",
            createdAt: "A minute ago",
            desc: "Ini description",
            imageUrl: "https://via.placeholder.com/150",
            title: "Ini Judul"
        },{
            createdAt: "Hati mana jatuh",
            demoUrl: "Hati mana jatuh",
            description: "Hati mana jatuh",
            iconUrl: "Hati mana jatuh",
            id: "Hati mana jatuh",
            imageUrls: ["manusia"],
            platform: "Hati mana jatuh",
            releasedUrl: "Hati mana jatuh",
            stack: ["manusia"],
            title: "Hati mana jatuh 1001",
            type: "IOS"
        }
    ]
    const action: AnyAction = {
        type: AppAction.READ_FEED_SUCCESS, payload: response
    }
    return dispatch(action)
}

export const addFeed = () => (dispatch, getState): AppDispatch => {
    const response: IEducation = {
        content: "Long time no see", createdAt: "Long time no see", desc: "Long time no see", fileUrl: "Long time no see", id: "Long time no see", imageUrl: "Long time no see", title: "Long time no see"
    }
    const action: AnyAction = {
        type: AppAction.CREATE_FEED_SUCCESS, payload: response
    }
    return dispatch(action)
}

export enum AppAction {
    CREATE_FEED_REQUEST = "@@CREATE_FEED_REQUEST",
    CREATE_FEED_FAILED = "@@CREATE_FEED_FAILED",
    CREATE_FEED_SUCCESS = "@@CREATE_FEED_SUCCESS",

    READ_FEED_REQUEST = "@@READ_FEED_REQUEST",
    READ_FEED_FAILED = "@@READ_FEED_FAILED",
    READ_FEED_SUCCESS = "@@READ_FEED_SUCCESS",

    PAGED_FEED_REQUEST = "@@PAGED_FEED_REQUEST",
    PAGED_FEED_FAILED = "@@PAGED_FEED_FAILED",
    PAGED_FEED_SUCCESS = "@@PAGED_FEED_SUCCESS",
}