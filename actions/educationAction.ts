import {AppDispatch, TAnyAction} from "@/store";
import {CALL_API, BROWSER_API, readFileAsImgSrcAsync} from "@/helpers"
import {randomUUID} from "crypto";

export const addEducation = () =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
    const education = getState().education.value
    const action: IAppAction = {
        [CALL_API]: {
            method: "POST",
            header: "/educations",
            contentType: "multipart/form-data",
            types: [
                EducationAction.CREATE_REQUEST,
                EducationAction.CREATE_FAILED,
                EducationAction.CREATE_SUCCESS
            ],
            body: education
        }
    }
    return dispatch(action)
}
export const removeEducation = () =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
    const {id, imageUrl} = getState().education.value
    const action: IAppAction = {
        [CALL_API]: {
            method: "DELETE",
            header: "/educations",
            params: {id: id || randomUUID()},
            types: [
                EducationAction.DELETE_REQUEST,
                EducationAction.DELETE_FAILED,
                EducationAction.DELETE_SUCCESS
            ],
            body: <TImageRequest>{imageUrl}
        }
    }
    return dispatch(action)
}
export const onInputChange = (idValue: [string, any]) =>
    (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: EducationAction.INPUT_CHANGED, payload: idValue
    }
    return dispatch(action)
}
export const onInputUnfocused = () =>
    (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: EducationAction.INPUT_UNFOCUSED
    }
    return dispatch(action)
}
export const onResetImageAppended = () =>
    (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: EducationAction.IMAGE_APPENDED_RESET
    }
    return dispatch(action)
}
export const addRemovableImageUrls = (url: string) =>
    (dispatch: AppDispatch) => {
    const action: TAnyAction = {
        type: EducationAction.ADD_REMOVABLE_IMAGE_URLS, payload: url
    }
    return dispatch(action)
}
export const onExcludeImageUrl = (url: string) => (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: EducationAction.EXCLUDE_IMAGE_URL, payload: url
    }
    return dispatch(action)
}
export const onResetSubmission = () =>
    (dispatch: AppDispatch): IAppAction => dispatch(
    <TAnyAction>{type: EducationAction.RESET_SUBMISSION}
)
export const onImageAppended = (file: any) =>
    (dispatch: AppDispatch): IAppAction => {

    const action: IAppAction = {
        [BROWSER_API]: {
            api: readFileAsImgSrcAsync(file),
            types: [
                EducationAction.IMAGE_APPENDED_REQUEST,
                EducationAction.IMAGE_APPENDED_FAILED,
                EducationAction.IMAGE_APPENDED_SUCCESS
            ]
        }
    }
    return dispatch(action)
}
export const updateEducation = () => (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
    const education = getState().education.value
    const id = education.id || randomUUID()
    const action: IAppAction = {
        [CALL_API]: {
            method: "PUT",
            header: "/educations",
            params: {id},
            contentType: "multipart/form-data",
            types: [
                EducationAction.UPDATE_REQUEST,
                EducationAction.UPDATE_FAILED,
                EducationAction.UPDATE_SUCCESS,
            ],
            body: education
        }
    }
    return dispatch(action)
}
export enum EducationAction {
    INPUT_CHANGED = "@@EDUCATION_INPUT_CHANGED",
    INPUT_UNFOCUSED = "@@EDUCATION_INPUT_UNFOCUSED",

    IMAGE_APPENDED_REQUEST = "@@EDUCATION_IMAGE_APPENDED_REQUEST",
    IMAGE_APPENDED_FAILED = "@@EDUCATION_IMAGE_APPENDED_FAILED",
    IMAGE_APPENDED_SUCCESS = "@@EDUCATION_IMAGE_APPENDED_SUCCESS",
    IMAGE_APPENDED_RESET = "@@EDUCATION_IMAGE_APPENDED_RESET",

    CREATE_REQUEST = "@@EDUCATION_CREATE_REQUEST",
    CREATE_FAILED = "@@EDUCATION_CREATE_FAILED",
    CREATE_SUCCESS = "@@EDUCATION_CREATE_SUCCESS",

    RESET_SUBMISSION = "@@EDUCATION_RESET_SUBMISSION",
    UPDATE_REQUEST = "@@EDUCATION_UPDATE_REQUEST",
    UPDATE_FAILED = "@@EDUCATION_UPDATE_FAILED",
    UPDATE_SUCCESS = "@@EDUCATION_UPDATE_SUCCESS",

    DELETE_REQUEST = "@@EDUCATION_DELETE_REQUEST",
    DELETE_FAILED = "@@EDUCATION_DELETE_FAILED",
    DELETE_SUCCESS = "@@EDUCATION_DELETE_SUCCESS",

    ADD_REMOVABLE_IMAGE_URLS = "@@EDUCATION_ADD_REMOVABLE_IMAGE_URLS",
    EXCLUDE_IMAGE_URL = "@@EDUCATION_EXCLUDE_IMAGE_URL"
}
