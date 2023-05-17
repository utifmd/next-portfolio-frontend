import {setTimeout} from "timers";
import {paginateListOf} from "../utils";
import {Middleware} from "redux";
import {TAnyAction} from "../store";
import {PAGINATION_SIZE} from "../actions";

export const CALL_API = "CALL_API"

const educations: IEducation[] = [
    {
        id: "PID-1001",
        fileUrl: "",
        content: "Ini content 1001",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1002",
        fileUrl: "",
        content: "Ini content 1002",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1003",
        fileUrl: "",
        content: "Ini content 1003",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1004",
        fileUrl: "",
        content: "Ini content 1004",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1005",
        fileUrl: "",
        content: "Ini content 1005",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1006",
        fileUrl: "",
        content: "Ini content 1006",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1007",
        fileUrl: "",
        content: "Ini content 1007",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    }
]
const experiences: IExperience[] = [
    {
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "Hati mana jatuh",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1001",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "Hati mana jatuh",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1002",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "Hati mana jatuh",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1003",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "Hati mana jatuh",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1004",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "Hati mana jatuh",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1005",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "Hati mana jatuh",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1006",
        type: "IOS"
    },{
        createdAt: "Hati mana jatuh",
        demoUrl: "Hati mana jatuh",
        description: "Hati mana jatuh",
        iconUrl: "Hati mana jatuh",
        id: "Hati mana jatuh",
        imageUrls: ["manusia"],
        platform: "Hati mana jatuh",
        releasedUrl: "Hati mana jatuh",
        stack: ["manusia"],
        title: "Hati mana jatuh 1007",
        type: "IOS"
    },
]

const httpRequest = ({header}: IHttpRequestAction) =>
    new Promise<ISchema[]>((resolve, reject) => {
    setTimeout(() => {
        if (!("page" in header)) {
            //data = educations; resolve(data)
            reject("request with no pagination.")
            return
        }
        const {page, size} = header
        const educationData = paginateListOf(educations, page, size)

        if (!educationData.length) {
            const experienceData = paginateListOf(experiences, 1, size)
            resolve(experienceData)
            return;
        }
        resolve(educationData)
    }, 1500)
})
const restApiMiddleware: Middleware<TDispatchApp> = () => (next: any) => (action: IAppAction) => {
    const callApi = action[CALL_API]
    if (typeof callApi === "undefined") return next(action)
    if (!("method" in callApi)) throw Error("Invalid call api.")

    const requestAction: IHttpRequestAction = callApi
    const [requestType, failedType, successType] = requestAction.status

    const actionWith = (data: TAnyAction) => {
        const act = Object.assign({}, action, data)
        delete act[CALL_API]
        return act
    }
    next(actionWith(<TAnyAction>{type: requestType}))
    return httpRequest(requestAction).then(
        (response) => next(actionWith(<TAnyAction>{type: successType, payload: response})),
        (error) => next(actionWith(<TAnyAction>{type: failedType, payload: error}))
    )
}
export default restApiMiddleware