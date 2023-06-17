import {AnyAction} from "redux";
import {AppDispatch, TAnyAction} from "@/store";
import {readFileAsImgSrcAsync} from "@/utils";
import {CALL_API, BROWSER_API, FileUploadField} from "../helpers"

export const addExperience = () =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
    const experience: IExperience & Record<string, any> = getState().experience.value
    const mapStateToFormData = (): FormData => {
        const multipleFiles = experience[FileUploadField.MULTIPLE]
        const singleFiles = experience[FileUploadField.SINGLE]
        const formData = new FormData()

        for (const [key, value] of Object.entries(experience))
            if (typeof value === "string" && value.length > 0) formData.append(key, value)

        formData.append(FileUploadField.SINGLE, singleFiles, singleFiles.name)

        for (const file of multipleFiles)
            formData.append(FileUploadField.MULTIPLE, file, file.name)

        for (const item of experience.stack)
            formData.append("stack", item)

        return formData
    }
    const action: IAppAction = {
        [CALL_API]: {
            method: "POST",
            header: "/experiences",
            contentType: "multipart/form-data",
            types: [
                ExperienceAction.CREATE_REQUEST,
                ExperienceAction.CREATE_FAILED,
                ExperienceAction.CREATE_SUCCESS
            ],
            body: mapStateToFormData()
        }
    }
    return dispatch(action)
}
export const removeExperience = () =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
        const experience = getState().experience.value
        const action: IAppAction = {
            [CALL_API]: {
                method: "DELETE",
                header: "/experiences",
                types: [
                    ExperienceAction.DELETE_REQUEST,
                    ExperienceAction.DELETE_FAILED,
                    ExperienceAction.DELETE_SUCCESS
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
            type: ExperienceAction.IMAGES_APPENDED_RESET, payload: index
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
        type: ExperienceAction.INPUT_STACK_CREATE, payload: stack
    }
    return dispatch(action)
}
export const onRemoveStack = (index: number) =>
    (dispatch: AppDispatch): IAppAction => {
    const action: TAnyAction = {
        type: ExperienceAction.INPUT_STACK_DELETE, payload: index
    }
    return dispatch(action)
}
export const onResetSubmission = () =>
    (dispatch: AppDispatch): IAppAction => dispatch(
        <TAnyAction>{type: ExperienceAction.RESET_SUBMISSION}
    )
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
    "FRONT-END" = "FRONT-END", "BACK-END" = "BACK-END", MOBILE = "MOBILE"
}
export enum ExperiencePlatform {
    ANDROID = "ANDROID", IOS = "IOS", WEB = "WEB"
}
export enum ExperienceAction {
    INPUT_CHANGED = "@@EXPERIENCE_INPUT_CHANGED",
    INPUT_UNFOCUSED = "@@EXPERIENCE_INPUT_UNFOCUSED",
    INPUT_STACK_CREATE = "@@EXPERIENCE_INPUT_STACK_CREATE",
    INPUT_STACK_DELETE = "@@EXPERIENCE_INPUT_STACK_DELETE",

    IMAGES_APPENDED_REQUEST = "@@EXPERIENCE_IMAGES_APPENDED_REQUEST",
    IMAGES_APPENDED_FAILED = "@@EXPERIENCE_IMAGES_APPENDED_FAILED",
    IMAGES_APPENDED_SUCCESS = "@@EXPERIENCE_IMAGES_APPENDED_SUCCESS",
    IMAGES_APPENDED_RESET = "@@EXPERIENCE_IMAGES_APPENDED_RESET",

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

    DELETE_REQUEST = "@@EXPERIENCE_DELETE_REQUEST",
    DELETE_FAILED = "@@EXPERIENCE_DELETE_FAILED",
    DELETE_SUCCESS = "@@EXPERIENCE_DELETE_SUCCESS",

    RESET_SUBMISSION = "@@EXPERIENCE_RESET_SUBMISSION",
}