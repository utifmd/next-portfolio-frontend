import {AppDispatch, TAnyAction} from "@/store";
import {BROWSER_API, CALL_API, REVALIDATE_IN_SECONDS, readFileAsImgSrcAsync} from "@/helpers";
import {randomUUID} from "crypto";

export const getProfile = (initial?: ISchema) => (dispatch: AppDispatch) => {
    const action: IAppAction = {
        [CALL_API]: {
            method: "GET",
            header: "/profile/:email",
            initialResponse: initial,
            types: [
                ProfileAction.READ_REQUEST,
                ProfileAction.READ_FAILED,
                ProfileAction.READ_SUCCESS
            ]
        }
    }
    return dispatch(action)
}
export async function getInitialProfileJson() {
    const {NEXT_PUBLIC_BASE_URL} = (process.env as any) as IEnvLocal
    const data = await fetch(
        `${NEXT_PUBLIC_BASE_URL}/profile/utifmd@gmail.com`,
        {next: {revalidate: REVALIDATE_IN_SECONDS}}
    )
    return data.json()
}
export const onInputChange = (idValue: [string, any]) =>
    (dispatch: AppDispatch): IAppAction => {
        const action: TAnyAction = {
            type: ProfileAction.INPUT_CHANGED, payload: idValue
        }
        return dispatch(action)
    }
export const onInputUnfocused = () =>
    (dispatch: AppDispatch): IAppAction => {
        const action: TAnyAction = {
            type: ProfileAction.INPUT_UNFOCUSED
        }
        return dispatch(action)
    }
export const onResetImageAppended = () =>
    (dispatch: AppDispatch): IAppAction => {
        const action: TAnyAction = {
            type: ProfileAction.IMAGE_APPENDED_RESET
        }
        return dispatch(action)
    }
export const addRemovableImageUrls = (url: string) =>
    (dispatch: AppDispatch) => {
        const action: TAnyAction = {
            type: ProfileAction.ADD_REMOVABLE_IMAGE_URLS, payload: url
        }
        return dispatch(action)
    }
export const onExcludeImageUrl = (url: string) => (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: ProfileAction.EXCLUDE_IMAGE_URL, payload: url
    }
    return dispatch(action)
}
export const onResetSubmission = () =>
    (dispatch: AppDispatch): IAppAction => dispatch(
        <TAnyAction>{type: ProfileAction.RESET_SUBMISSION}
    )
export const onImageAppended = (file: any) =>
    (dispatch: AppDispatch): IAppAction => {

        const action: IAppAction = {
            [BROWSER_API]: {
                api: readFileAsImgSrcAsync(file),
                types: [
                    ProfileAction.IMAGE_APPENDED_REQUEST,
                    ProfileAction.IMAGE_APPENDED_FAILED,
                    ProfileAction.IMAGE_APPENDED_SUCCESS
                ]
            }
        }
        return dispatch(action)
    }
export const updateMainProfile = () =>
    (dispatch: AppDispatch, getState: () => IAppState) => {
    const profile = getState().profile.value
    const id = profile.id || randomUUID()
    // delete profile.links
    // delete profile.data
    const action: IAppAction = {
        [CALL_API]: {
            method: "PUT",
            header: `/profile`,
            params: {id},
            body: profile,
            types: [
                ProfileAction.UPDATE_MAIN_REQUEST,
                ProfileAction.UPDATE_MAIN_FAILED,
                ProfileAction.UPDATE_MAIN_SUCCESS
            ],
            contentType: "multipart/form-data"
        }
    }
    return dispatch(action)
}
export const updateLinkProfile = () =>
    (dispatch: AppDispatch, getState: () => IAppState) => {
    const profileLinks = getState().profile.value.links as IProfileLinks
    const id = profileLinks.id || randomUUID()
    const action: IAppAction = {
        [CALL_API]: {
            method: "PUT",
            header: `/profile/link`,
            params: {id},
            body: profileLinks,
            types: [
                ProfileAction.UPDATE_LINK_REQUEST,
                ProfileAction.UPDATE_LINK_FAILED,
                ProfileAction.UPDATE_LINK_SUCCESS
            ]
        }
    }
    return dispatch(action)
}
export const updateDataProfile = (id: string) =>
    (dispatch: AppDispatch, getState: () => IAppState) => {
    const profileState = getState().profile
    const profileData = profileState.value.data?.find(
        ({id}) => id === profileState.useCaseDataId
    )
    const action: IAppAction = {
        [CALL_API]: {
            method: "PUT",
            header: `/profile/data`,
            params: {id},
            body: profileData,
            types: [
                ProfileAction.UPDATE_DATA_REQUEST,
                ProfileAction.UPDATE_DATA_FAILED,
                ProfileAction.UPDATE_DATA_SUCCESS
            ]
        }
    }
    return dispatch(action)
}
export const setUseCaseDataId = (profileDataId?: string) => (dispatch: AppDispatch) => {
    const action: TAnyAction = {
        type: ProfileAction.SET_USE_CASE_DATA_ID, payload: profileDataId
    }
    return dispatch(action)
}
export const setUseCase = (useCase: "main" | "link" | "data") => (dispatch: AppDispatch) => {
    const action: TAnyAction = {
        type: ProfileAction.SET_USE_CASE, payload: useCase
    }
    return dispatch(action)
}
export enum ProfileAction {
    READ_REQUEST = "@@PROFILE_READ_REQUEST",
    READ_FAILED = "@@PROFILE_READ_FAILED",
    READ_SUCCESS = "@@PROFILE_READ_SUCCESS",

    INPUT_CHANGED = "@@PROFILE_INPUT_CHANGED",
    INPUT_UNFOCUSED = "@@PROFILE_INPUT_UNFOCUSED",

    IMAGE_APPENDED_REQUEST = "@@PROFILE_IMAGE_APPENDED_REQUEST",
    IMAGE_APPENDED_FAILED = "@@PROFILE_IMAGE_APPENDED_FAILED",
    IMAGE_APPENDED_SUCCESS = "@@PROFILE_IMAGE_APPENDED_SUCCESS",
    IMAGE_APPENDED_RESET = "@@PROFILE_IMAGE_APPENDED_RESET",

    RESET_SUBMISSION = "@@PROFILE_RESET_SUBMISSION",

    UPDATE_MAIN_REQUEST = "@@PROFILE_MAIN_UPDATE_REQUEST",
    UPDATE_MAIN_FAILED = "@@PROFILE_MAIN_UPDATE_FAILED",
    UPDATE_MAIN_SUCCESS = "@@PROFILE_MAIN_UPDATE_SUCCESS",

    UPDATE_LINK_REQUEST = "@@PROFILE_LINK_UPDATE_REQUEST",
    UPDATE_LINK_FAILED = "@@PROFILE_LINK_UPDATE_FAILED",
    UPDATE_LINK_SUCCESS = "@@PROFILE_LINK_UPDATE_SUCCESS",

    UPDATE_DATA_REQUEST = "@@PROFILE_DATA_UPDATE_REQUEST",
    UPDATE_DATA_FAILED = "@@PROFILE_DATA_UPDATE_FAILED",
    UPDATE_DATA_SUCCESS = "@@PROFILE_DATA_UPDATE_SUCCESS",

    ADD_REMOVABLE_IMAGE_URLS = "@@PROFILE_ADD_REMOVABLE_IMAGE_URLS",
    EXCLUDE_IMAGE_URL = "@@PROFILE_EXCLUDE_IMAGE_URL",
    SET_USE_CASE_DATA_ID  = "@@PROFILE_SET_USE_CASE_DATA_ID",
    SET_USE_CASE  = "@@PROFILE_SET_USE_CASE"
}