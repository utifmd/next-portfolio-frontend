import {AppDispatch, TAnyAction} from "@/store";
import {CALL_API} from "@/constants"

const PAGINATION_SIZE: number = 1
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
                endpoints: [`/educations`, "/experiences"]
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
const onSelectFeedItem = (index: number) =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {

    const selectedFeedItem = getState().home.feed.value[index]
    if("content" in selectedFeedItem){
        const payload = <IEducationState>{
            value: selectedFeedItem,
            isSubmitted: false,
            isValid: false,
            isSelected: true,
            status: "idle"
        }
        const action: TAnyAction = {
            payload, type: HomeAction.SELECT_FEED_EDUCATION
        }
        return dispatch(action)
    }
    const payload = <IExperienceState>{
        value: selectedFeedItem as IExperience,
        isSubmitted: false,
        isValid: false,
        isSelected: true,
        images: [],
        status: "idle"
    }
    const action: TAnyAction = {
        payload, type: HomeAction.SELECT_FEED_EXPERIENCE
    }
    return dispatch(action)
}
export const onFeedStartedFalse = () => (dispatch: AppDispatch) => {
    return dispatch(<TAnyAction>{type: HomeAction.SET_IS_FEED_STARTED_FALSE})
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

    SELECT_FEED_EDUCATION = "@@SELECT_FEED_EDUCATION",
    SELECT_FEED_EXPERIENCE = "@@SELECT_FEED_EXPERIENCE",

    SET_IS_FEED_STARTED_FALSE = "@@SET_IS_FEED_STARTED_FALSE"
}
export {
    PAGINATION_SIZE, pagedFeed, onSelectFeedItem, HomeAction
}