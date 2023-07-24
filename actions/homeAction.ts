import {AppDispatch, TAnyAction} from "@/store";
import {CALL_API, REVALIDATE_IN_SECONDS} from "@/helpers"

const PAGINATION_SIZE: number = 3
const pagedFeed = (initialData?: ISchema[]) =>
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
            ],
            initialResponse: initialData
        }
    }
    return dispatch(action)
}
export async function getInitialFeedJson() {
    const {NEXT_PUBLIC_BASE_URL} = (process.env as any) as IEnvLocal
    const data = await fetch(
        `${NEXT_PUBLIC_BASE_URL}/educations?page=0&size=${PAGINATION_SIZE}`,
        {next: {revalidate: REVALIDATE_IN_SECONDS}}
    )
    return <IFeedState>{
        status: "idle",
        isExpTurn: false,
        isStarted: true,
        isDone: false,
        page: 0,
        value: await data.json()}
}
const onSelectFeedItem = (index: number) =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {

    const selectedFeedItem = getState().home.feed.value[index]
    if("content" in selectedFeedItem){
        const payload = <IEducationState>{
            value: selectedFeedItem as IEducation,
            isSubmitted: false,
            isValid: false,
            isSelected: true,
            removableImageUrls: [],
            status: "idle"
        }
        const action: TAnyAction = {
            payload, type: HomeAction.SELECT_FEED_EDUCATION
        }
        return dispatch(action)
    }
    const value = selectedFeedItem as IExperience
    const images: TKeyValueProps[] = []

    if (value.imageUrls) for (let i = 0; i < value.imageUrls.length; i++) {
        images.push({key: i, value: value.imageUrls[i]})
    }
    const payload = <IExperienceState>{
        value,
        isSubmitted: false,
        isValid: false,
        isSelected: true,
        images,
        icon: value.iconUrl,
        removableImageUrls: [],
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