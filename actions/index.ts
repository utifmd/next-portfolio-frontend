import {AppDispatch, TAnyAction} from "@/store";
import {CALL_API} from "@/middlewares";

const PAGINATION_SIZE = 3
const pagedFeed = () =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
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
            types: [
                HomeAction.PAGED_FEED_REQUEST,
                HomeAction.PAGED_FEED_FAILED,
                HomeAction.PAGED_FEED_SUCCESS
            ]
        }
    }
    return dispatch(action)
}

const onSelectToUpdate = (index: number) =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
    const selectedFeedItem = getState().home.feed.value[index]
    const schemaState = "content" in selectedFeedItem
        ? <IEducationState>{
            value: selectedFeedItem, isSubmitted: false, isValid: true, status: "idle"
        }
        : <IExperienceState>{}

    const action: TAnyAction = {
        payload: schemaState, type: HomeAction.UPDATE_FEED_PREPARATION
    }
    return dispatch(action)
}

enum HomeAction {
    CREATE_FEED_REQUEST = "@@CREATE_FEED_REQUEST",
    CREATE_FEED_FAILED = "@@CREATE_FEED_FAILED",
    CREATE_FEED_SUCCESS = "@@CREATE_FEED_SUCCESS",

    READ_FEED_REQUEST = "@@READ_FEED_REQUEST",
    READ_FEED_FAILED = "@@READ_FEED_FAILED",
    READ_FEED_SUCCESS = "@@READ_FEED_SUCCESS",

    PAGED_FEED_REQUEST = "@@PAGED_FEED_REQUEST",
    PAGED_FEED_FAILED = "@@PAGED_FEED_FAILED",
    PAGED_FEED_SUCCESS = "@@PAGED_FEED_SUCCESS",

    UPDATE_FEED_PREPARATION = "@UPDATE_FEED_PREPARATION",
}
export {
    PAGINATION_SIZE,
    pagedFeed, onSelectToUpdate, //getFeed, addFeed,
    HomeAction
}