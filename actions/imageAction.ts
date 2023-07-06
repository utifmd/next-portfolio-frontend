import {AppDispatch} from "@/store";
import {CALL_API} from "@/helpers";

export const removeImages = (request: TImageRequest) => (dispatch: AppDispatch) => {
    const action: IAppAction = {
        [CALL_API]: {
            method: "DELETE",
            header: "/images",
            types: [
                ImageAction.DELETE_REQUEST,
                ImageAction.DELETE_FAILED,
                ImageAction.DELETE_SUCCESS
            ],
            body: request
        }
    }
    return dispatch(action)
}
export enum ImageAction {
    DELETE_REQUEST = "@@FILE_DELETE_REQUEST",
    DELETE_FAILED = "@@FILE_DELETE_FAILED",
    DELETE_SUCCESS = "@@FILE_DELETE_SUCCESS"
}