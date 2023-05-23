import {AppDispatch, TAppAction} from "../store";
import {CALL_API} from "../middlewares/restApi";

const PAGINATION_SIZE = 3
const pagedFeed = () =>
    (dispatch: AppDispatch, getState: () => IAppState): TAppAction => {
    const {feed} = getState().home

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

enum AppAction {
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
export {
    PAGINATION_SIZE,
    pagedFeed, //getFeed, addFeed,
    AppAction
}