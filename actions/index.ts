import {AppDispatch} from "../store";
import {AnyAction} from "redux";
import {CALL_API} from "../middlewares/restApi";

export const PAGINATION_SIZE = 3
export const pagedFeed = () => (dispatch, getState): AppDispatch => {
    const {feed} = (getState() as IRootState).home

    const action: IAppAction = {
        [CALL_API]: {
            method: "GET",
            header: {
                page: feed.page,
                isExpTurn: feed.isExpTurn,
                size: PAGINATION_SIZE,
                endpoints: ["/educations", "/experiences"]
            },
            status: [
                AppAction.PAGED_FEED_REQUEST,
                AppAction.PAGED_FEED_FAILED,
                AppAction.PAGED_FEED_SUCCESS
            ]
        }
    }
    return dispatch(action)
}

export const getFeed = () => (dispatch): AppDispatch => {
    const response: ISchema[] = [
        {
            id: "PID-1001",
            fileUrl: "",
            content: "Ini content 1001",
            createdAt: "A minute ago",
            desc: "Ini description",
            imageUrl: "https://via.placeholder.com/150",
            title: "Ini Judul"
        }, {
            id: "PID-1002",
            fileUrl: "",
            content: "Ini content 1002",
            createdAt: "A minute ago",
            desc: "Ini description",
            imageUrl: "https://via.placeholder.com/150",
            title: "Ini Judul"
        }, {
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

export const addFeed = () => (dispatch): AppDispatch => {
    const response: IEducation = {
        content: "Long time no see",
        createdAt: "Long time no see",
        desc: "Long time no see",
        fileUrl: "Long time no see",
        id: "Long time no see",
        imageUrl: "Long time no see",
        title: "Long time no see"
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
    PAGED_FEED_SUCCESS = "@@PAGED_FEED_SUCCESS"
}