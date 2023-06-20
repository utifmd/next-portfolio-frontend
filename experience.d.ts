interface IExperience extends ISchema {
    id?: string,
    type: string, // "front-end" | "back-end" | "mobile",
    title: string,
    description: string,
    platform: string, // "android" | "ios" | "web",
    stack: string[],
    imageUrls?: string[],
    iconUrl?: string,
    releasedUrl: string,
    demoUrl?: string,
    createdAt?: any
}
interface IExperienceState {
    status: "idle" | "loading" | "error",
    message?: string,
    icon?: any,
    images: any[],
    removableImageIds: string[],
    value: IExperience,
    isValid: boolean,
    isSubmitted: boolean,
    isSelected?: boolean
}
// type TDispatchExperience = (state: IExperienceState) => IExperienceState