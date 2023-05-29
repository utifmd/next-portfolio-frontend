import {AppDispatch, TAnyAction} from "@/store";
import {AnyAction} from "redux";
import {readFileAsImgSrcAsync} from "@/utils";
import {BROWSER_API, CALL_API} from "@/middlewares";
import {EducationAction} from "./educationAction";

export const addExperience = () =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
    const {value} = getState().experience
    const date = new Date()
    const experience: IExperience = {
        ...value,
        id: `EXP-${date.getTime()}`,
        createdAt: date
    }
    const action: IAppAction = {
        [CALL_API]: {
            method: "POST",
            header: "/experiences",
            types: [
                ExperienceAction.CREATE_REQUEST,
                ExperienceAction.CREATE_FAILED,
                EducationAction.CREATE_SUCCESS
            ],
            body: experience
        }
    }
    return dispatch(action)
}

export const onImageAppended = (file: any) =>
    (dispatch: AppDispatch): IAppAction => {
    const action: IAppAction = {
        [BROWSER_API]: {
            api: readFileAsImgSrcAsync(file),
            types: [
                ExperienceAction.IMAGES_APPENDED_REQUEST,
                ExperienceAction.IMAGES_APPENDED_FAILED,
                ExperienceAction.IMAGES_APPENDED_SUCCESS
            ]
        }
    }
    return dispatch(action)
}
export const onRemoveImageAppended = (index: number) =>
    (dispatch: AppDispatch): IAppAction => {
        const action: TAnyAction = {
            type: ExperienceAction.DELETE_IMAGES_APPENDED, payload: index
        }
        return dispatch(action)
    }
export const onIconAppended = (file: any) =>
    (dispatch: AppDispatch): IAppAction => {
    const action: IAppAction = {
        [BROWSER_API]: {
            api: readFileAsImgSrcAsync(file),
            types: [
                ExperienceAction.ICON_APPENDED_REQUEST,
                ExperienceAction.ICON_APPENDED_FAILED,
                ExperienceAction.ICON_APPENDED_SUCCESS
            ]
        }
    }
    return dispatch(action)
}

export const onInputChange = (idValue: [string, any]) =>
    (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: ExperienceAction.INPUT_CHANGED, payload: idValue
    }
    return dispatch(action)
}
export const onAddStack = (stack: string) =>
    (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: ExperienceAction.INPUT_ADD_STACK, payload: stack
    }
    return dispatch(action)
}
export const onInputUnfocused = () =>
    (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: ExperienceAction.INPUT_UNFOCUSED
    }
    return dispatch(action)
}
export const getAllExperience = () => (dispatch: AppDispatch) => {
    const response: IExperience[] = []
    const action: AnyAction = {
        type: ExperienceAction.READ_ALL_SUCCESS, payload: response
    }
    return dispatch(action)
}
export enum ExperienceType {
    FRONTEND = "FRONTEND", BACKEND = "BACKEND", MOBILE = "MOBILE"
}
export enum ExperiencePlatform {
    ANDROID = "ANDROID", IOS = "IOS", WEB = "WEB"
}
export enum ExperienceAction {
    INPUT_CHANGED = "@@EXPERIENCE_INPUT_CHANGED",
    INPUT_UNFOCUSED = "@@EXPERIENCE_INPUT_UNFOCUSED",
    INPUT_ADD_STACK = "@@EXPERIENCE_INPUT_ADD_STACK",

    IMAGES_APPENDED_REQUEST = "@@EXPERIENCE_IMAGES_APPENDED_REQUEST",
    IMAGES_APPENDED_FAILED = "@@EXPERIENCE_IMAGES_APPENDED_FAILED",
    IMAGES_APPENDED_SUCCESS = "@@EXPERIENCE_IMAGES_APPENDED_SUCCESS",
    DELETE_IMAGES_APPENDED = "@@EXPERIENCE_DELETE_IMAGES_APPENDED",

    ICON_APPENDED_REQUEST = "@@EXPERIENCE_ICON_APPENDED_REQUEST",
    ICON_APPENDED_FAILED = "@@EXPERIENCE_ICON_APPENDED_FAILED",
    ICON_APPENDED_SUCCESS = "@@EXPERIENCE_ICON_APPENDED_SUCCESS",

    CREATE_REQUEST = "@@EXPERIENCE_CREATE_REQUEST",
    CREATE_FAILED = "@@EXPERIENCE_CREATE_FAILED",
    CREATE_SUCCESS = "@@EXPERIENCE_CREATE_SUCCESS",

    READ_ALL_REQUEST = "@@EXPERIENCE_READ_ALL_REQUEST",
    READ_ALL_FAILED = "@@EXPERIENCE_READ_ALL_FAILED",
    READ_ALL_SUCCESS = "@@EXPERIENCE_READ_ALL_SUCCESS",

    UPDATE = "@@EXPERIENCE_UPDATE",
    DELETE = "@@EXPERIENCE_DELETE",
}