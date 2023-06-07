import {AppDispatch, TAnyAction} from "@/store";
import {readFileAsImgSrcAsync} from "@/utils";
import {BROWSER_API} from "@/middlewares/browserApi";
import {CALL_API} from "../constants"

export const addEducation = () =>
    (dispatch: AppDispatch, getState: () => IAppState): IAppAction => {
    const {value/*, image*/} = getState().education
    const education: IEducation /*& {image: any}*/ = {
        ...value, //image,
        id: "EDU-101",
        createdAt: new Date(),
    }
    const action: IAppAction = {
        [CALL_API]: {
            method: "POST",
            header: "/educations",
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
        type: EducationAction.DELETE_IMAGE_APPENDED
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
export enum EducationAction {
    INPUT_CHANGED = "@@EDUCATION_INPUT_CHANGED",
    INPUT_UNFOCUSED = "@@EDUCATION_INPUT_UNFOCUSED",

    IMAGE_APPENDED_REQUEST = "@@EDUCATION_IMAGE_APPENDED_REQUEST",
    IMAGE_APPENDED_FAILED = "@@EDUCATION_IMAGE_APPENDED_FAILED",
    IMAGE_APPENDED_SUCCESS = "@@EDUCATION_IMAGE_APPENDED_SUCCESS",
    DELETE_IMAGE_APPENDED = "@@EDUCATION_DELETE_IMAGE_APPENDED",

    CREATE_REQUEST = "@@EDUCATION_CREATE_REQUEST",
    CREATE_FAILED = "@@EDUCATION_CREATE_FAILED",
    CREATE_SUCCESS = "@@EDUCATION_CREATE_SUCCESS",

    READ_ALL_REQUEST = "@@EDUCATION_READ_ALL_REQUEST",
    READ_ALL_FAILED = "@@EDUCATION_READ_ALL_FAILED",
    READ_ALL_SUCCESS = "@@EDUCATION_READ_ALL_SUCCESS",

    RESET_SUBMISSION = "@@EDUCATION_RESET_SUBMISSION",
    UPDATE = "@@EDUCATION_UPDATE",

    DELETE = "@@EDUCATION_DELETE",
}
