import {AppDispatch, TAnyAction, TAppAction} from "../store";
// import {CALL_API} from "../middlewares/restApi";
import {AnyAction} from "redux";

export const addEducation = () =>
    (dispatch: AppDispatch, getState: () => IAppState): TAppAction => {
    /*const action: IAppAction = {
        [CALL_API]: {
            method: "POST",
            header: "/educations",
            status: [
                EducationAction.CREATE_REQUEST,
                EducationAction.CREATE_FAILED,
                EducationAction.CREATE_SUCCESS
            ],
            body: education
        }
    }*/
    const {value} = getState().education
    const payload: IEducation = {
        ...value,
        id: "101",
        createdAt: "a minute ago",
    }
    const action: AnyAction = {
        type: EducationAction.CREATE_SUCCESS, payload
    }
    return dispatch(action)
}
export const onTextInputChange = (idValue: [string, string]) =>
    (dispatch: AppDispatch): TAppAction => {
    const action: TAnyAction = {
        type: EducationAction.TEXT_INPUT_CHANGED, payload: idValue
    }
    return dispatch(action)
}
export enum EducationAction {
    TEXT_INPUT_CHANGED = "@@EDUCATION_TEXT_INPUT_CHANGED",

    CREATE_REQUEST = "@@EDUCATION_CREATE_REQUEST",
    CREATE_FAILED = "@@EDUCATION_CREATE_FAILED",
    CREATE_SUCCESS = "@@EDUCATION_CREATE_SUCCESS",

    READ_ALL_REQUEST = "@@EDUCATION_READ_ALL_REQUEST",
    READ_ALL_FAILED = "@@EDUCATION_READ_ALL_FAILED",
    READ_ALL_SUCCESS = "@@EDUCATION_READ_ALL_SUCCESS",

    UPDATE = "@@EDUCATION_UPDATE",

    DELETE = "@@EDUCATION_DELETE",
}
