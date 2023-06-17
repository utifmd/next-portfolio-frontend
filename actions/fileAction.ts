import {AppDispatch} from "@/store";
import {CALL_API} from "@/helpers";

export const removeFile = (id: string) =>
    (dispatch: AppDispatch): IAppAction => {
    const action: IAppAction = {
        [CALL_API]: {
            method: "DELETE",
            header: `/files`,
            params: {id},
            types: [
                FileAction.DELETE_REQUEST,
                FileAction.DELETE_FAILED,
                FileAction.DELETE_SUCCESS,
            ]
        }
    }
    return dispatch(action)
}
export enum FileAction {
    DELETE_REQUEST = "@@FILE_DELETE_REQUEST",
    DELETE_FAILED = "@@FILE_DELETE_FAILED",
    DELETE_SUCCESS = "@@FILE_DELETE_SUCCESS"
}