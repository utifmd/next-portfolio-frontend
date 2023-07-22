import {Reducer} from "redux";
import {ExperienceAction} from "@/actions/experienceAction";
import {HomeAction} from "@/actions/homeAction";
import {FileAction} from "@/actions/fileAction";
import {ImageAction} from "@/actions/imageAction";
import {isBase64, isUrl} from "@/helpers";

const initialState: IExperienceState = {
    removableImageUrls: [],
    status: "idle",
    isValid: false,
    isSubmitted: false,
    images: [],
    icon: null,
    value: {
        title: "",
        description: "",
        platform: "",
        type: "",
        releasedUrl: "",
        demoUrl: null,
        iconUrl: "",
        imageUrls: null,
        stack: []
    }
}
const reducer: Reducer<IExperienceState> =
    (state: IExperienceState = initialState, action): IExperienceState => {

    const isValid: boolean = state.icon && Object
        .entries(state.value)
        .filter(([_, mValue]) => typeof mValue === "string")
        .filter(([mKey]) => mKey !== "demoUrl" && mKey !== "iconUrl")
        .every(([_, mValue]) => mValue.length > 0)

    switch (action.type) {
        case ExperienceAction.IMAGES_APPENDED_REQUEST:
        case ExperienceAction.ICON_APPENDED_REQUEST:
        case ExperienceAction.CREATE_REQUEST:
        case ExperienceAction.DELETE_REQUEST:
        case ExperienceAction.UPDATE_REQUEST:
        case FileAction.DELETE_REQUEST:
        case ImageAction.DELETE_REQUEST:
            return {...state, status: "loading"}

        case ExperienceAction.IMAGES_APPENDED_FAILED:
        case ExperienceAction.ICON_APPENDED_FAILED:
        case ExperienceAction.CREATE_FAILED:
        case ExperienceAction.DELETE_FAILED:
        case ExperienceAction.UPDATE_FAILED:
        case FileAction.DELETE_FAILED:
        case ImageAction.DELETE_FAILED:
            return {...state, status: "error", message: action.payload}

        case HomeAction.SELECT_FEED_EXPERIENCE:
            return action.payload as IExperienceState

        case ExperienceAction.INPUT_CHANGED: {
            const [id, value] = action.payload as [string, any]
            return {...state, value: {...state.value, [id]: value}, isValid}
        }
        case ExperienceAction.INPUT_STACK_CREATE: {
            const stack = [...state.value.stack, action.payload as string]
            return {...state, value: {...state.value, stack}}
        }
        case ExperienceAction.INPUT_STACK_DELETE: {
            const index = action.payload as number
            const stack = state.value.stack.filter(
                (_, i) => i !== index
            )
            return {...state, value: {...state.value, stack}}
        }
        case ExperienceAction.INPUT_UNFOCUSED:
            return {...state, isValid}

        case ExperienceAction.ICON_APPENDED_SUCCESS:
            return {...state, status: "idle", icon: action.payload}

        case ExperienceAction.IMAGES_APPENDED_SUCCESS: {
            const key = state.images.reduce(
                (prev, cur, i) => Math.max(cur.key), 0) +1

            const image = <TKeyValueProps>{
                key, value: action.payload as string
            }
            return {...state, status: "idle", images: [...state.images, image]}
        }
        case ExperienceAction.IMAGES_APPENDED_DELETE: {
            const key = action.payload as number
            if (key < 0)
                return {...state, icon: null, value: {...state.value, iconUrl: ""}}

            let imageUrls = state.value.imageUrls
            const selectedImageValue = state.images.find(img => img.key === key)?.value || null
            const removableImageUrls = state.removableImageUrls
            if (selectedImageValue && isUrl(selectedImageValue)) {
                imageUrls = imageUrls?.filter(mUrl => mUrl !== selectedImageValue) || null
                removableImageUrls.push(selectedImageValue)
            }
            const images = state.images.filter(
                props => props.key !== key
            )
            return {...state,
                images,
                removableImageUrls,
                value: {...state.value,
                    imageUrls
                }
            }
        }
        case ExperienceAction.RESET_SUBMISSION:
            return {...state, isSubmitted: false}

        case ExperienceAction.CREATE_SUCCESS:
        case ExperienceAction.DELETE_SUCCESS:
        case ExperienceAction.UPDATE_SUCCESS:
            return {...initialState, isSubmitted: true}

        case FileAction.DELETE_SUCCESS:
        case ImageAction.DELETE_SUCCESS:
            return {...state, status: "idle"}

        default:
            return state
    }
}
export default reducer