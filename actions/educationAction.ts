import {AnyAction} from "redux";
import {AppDispatch} from "../store";

export const getAllEducations = () =>
    (dispatch, getState): AppDispatch => {
    const response: IEducation[] = [
        {
            content: "Ini content",
            createdAt: "A minute ago",
            desc: "Ini description",
            fileUrl: "",
            id: "",
            imageUrl: "https://via.placeholder.com/150",
            title: "Ini Judul"
        }
    ]
    const action: AnyAction = {
        type: EducationAction.READ_ALL_SUCCESS, payload: response
    }
    return dispatch(action)
}

export enum EducationAction {
    CREATE = "@@EDUCATION_CREATE",
    READ_ALL_REQUEST = "@@EDUCATION_READ_ALL_REQUEST",
    READ_ALL_FAILED = "@@EDUCATION_READ_ALL_FAILED",
    READ_ALL_SUCCESS = "@@EDUCATION_READ_ALL_SUCCESS",
    UPDATE = "@@EDUCATION_UPDATE",
    DELETE = "@@EDUCATION_DELETE",
}
