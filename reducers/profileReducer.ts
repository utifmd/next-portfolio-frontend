import {Reducer} from "redux";
import {TAnyAction} from "@/store";
import {ProfileAction} from "@/actions/profileAction";
import {ImageAction} from "@/actions/imageAction";
import {FileUploadField} from "@/helpers";

const initialState: IProfileState = {
    useCase: "main",
    useCaseDataId: undefined,
    image: undefined,
    isSubmitted: false,
    isValid: false,
    message: "",
    status: "idle",
    removableImageUrls: [],
    value: {
        bio: "",
        data: undefined,
        fullName: "",
        imageUrl: "",
        jobTitle: "",
        links: undefined,
        role: "GUEST"
    }
}
const reducer: Reducer<IProfileState> = (
    state: IProfileState = initialState, action: TAnyAction): IProfileState => {
    let isValid: boolean = false

    switch (state.useCase){
        case "data": {
            if (!state.value.data) break
            const profileData = state.value.data as IProfileData[]
            isValid = profileData.every(({title, description}) =>
                title.length > 0 && description.length > 0
            )
            break
        }
        case "link": {
            if (!state.value.links) break
            isValid = Object.values(state.value.links as IProfileLinks)
                .filter((mValue) => typeof mValue === "string")
                .every((mValue) => mValue.length > 0)
            break
        }
        default: {
            const isImageValid = state.value.imageUrl.length > 0 || typeof state.image !== "undefined"

            isValid = isImageValid && Object
                .entries(state.value)
                .filter(([mKey, mValue]) => typeof mValue === "string" && mKey !== "imageUrl")
                .every(([_, mValue]) => mValue.length > 0)
            break
        }
    }
    switch (action.type) {
        case ProfileAction.READ_REQUEST:
            return {...state, status: "loading"}

        case ProfileAction.READ_FAILED:
            return {...state, status: "error", message: action.payload}

        case ProfileAction.READ_SUCCESS: {
            const value = action.payload as IProfile
            return {...state, status: "idle",/*useCaseDataId: value.data?.[0].id,*/ value}
        }
        case ImageAction.DELETE_REQUEST:
        case ProfileAction.IMAGE_APPENDED_REQUEST:
        case ProfileAction.UPDATE_MAIN_REQUEST:
        case ProfileAction.UPDATE_LINK_REQUEST:
        case ProfileAction.UPDATE_DATA_REQUEST:
            return {...state, status: "loading"}

        case ImageAction.DELETE_FAILED:
        case ProfileAction.IMAGE_APPENDED_FAILED:
        case ProfileAction.UPDATE_MAIN_FAILED:
        case ProfileAction.UPDATE_LINK_FAILED:
        case ProfileAction.UPDATE_DATA_FAILED:
            return {...state, status: "error", message: action.payload}

        case ProfileAction.INPUT_CHANGED: {
            const [mId, mValue] = action.payload as [string, any]
            const value = state.useCase === "link"
                ? <IProfile>{...state.value, links: <IProfileLinks>{...state.value.links, [mId]: mValue}}
                : state.useCase === "data"
                    ? <IProfile>{...state.value, data: state.value.data?.map(profileData => {
                        if (profileData.id === state.useCaseDataId)
                            return {...profileData, [mId]: mValue}
                        return profileData
                    })}
                    : <IProfile>{...state.value, [mId]: mValue}

            return {...state, value, isValid}
        }
        case ProfileAction.INPUT_UNFOCUSED:
            return {...state, isValid}

        case ProfileAction.IMAGE_APPENDED_SUCCESS:
            return {...state, status: "idle", image: action.payload}

        case ProfileAction.IMAGE_APPENDED_RESET: {
            const mState: IProfileState & any = {
                ...state, image: undefined
            }
            delete mState.value[FileUploadField.SINGLE]
            return mState
        }
        case ProfileAction.ADD_REMOVABLE_IMAGE_URLS: {
            const url = action.payload as string
            return {...state,
                removableImageUrls: [...state.removableImageUrls, url],
                value: {...state.value,
                    imageUrl: state.value.imageUrl !== url ? state.value.imageUrl : ""
                }
            }
        }
        case ProfileAction.EXCLUDE_IMAGE_URL: {
            const url = action.payload as string
            const imageUrl = state.value.imageUrl !== url ? state.value.imageUrl : ""
            return {...state, value: {...state.value, imageUrl}}
        }
        case ProfileAction.RESET_SUBMISSION:
            return {...state, isSubmitted: false}

        case ImageAction.DELETE_SUCCESS:
            return {...state, status: "idle"}

        case ProfileAction.UPDATE_MAIN_SUCCESS:
            return {...state, value: action.payload, isSubmitted: true}

        case ProfileAction.UPDATE_LINK_SUCCESS:
            return {...state, value: {...state.value, links: action.payload}, isSubmitted: true}

        case ProfileAction.UPDATE_DATA_SUCCESS: {
            const response = action.payload as IProfileData
            const data = state.value.data?.map(
                mProfileData => mProfileData.id === response.id ? response : mProfileData
            )
            return {...state, value: {...state.value, data}, isSubmitted: true}
        }
        case ProfileAction.SET_USE_CASE:
            return {...state, useCase: action.payload}

        case ProfileAction.SET_USE_CASE_DATA_ID:
            return {...state, useCaseDataId: action.payload}

        default:
            return state
    }
}
export default reducer