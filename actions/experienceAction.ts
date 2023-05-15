import {AppDispatch} from "../store";
import {AnyAction} from "redux";

export const getAllExperience = () =>
    (dispatch: AppDispatch, getState: AnyAction) => {
    const response: IExperience[] = [
        {
            createdAt: "asf",
            demoUrl: "ngdn",
            description: "xgf",
            iconUrl: "https://via.placeholder.com/150",
            id: "cnxvn",
            imageUrls: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
            platform: "xvmxgm",
            releasedUrl: "https://via.placeholder.com/150",
            stack: ["asdjk", "dfsdjgkz", "oash"],
            title: "sjsfj",
            type: "hjljl"
        }
    ]
    const action: AnyAction = {
        type: ExperienceAction.READ_ALL_SUCCESS, payload: response
    }
    return dispatch(action)
}
export enum ExperienceAction {
    CREATE = "@@EXPERIENCE_CREATE",
    READ_ALL_REQUEST = "@@EXPERIENCE_READ_ALL_REQUEST",
    READ_ALL_FAILED = "@@EXPERIENCE_READ_ALL_FAILED",
    READ_ALL_SUCCESS = "@@EXPERIENCE_READ_ALL_SUCCESS",
    UPDATE = "@@EXPERIENCE_UPDATE",
    DELETE = "@@EXPERIENCE_DELETE",
}