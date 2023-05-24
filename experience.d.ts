interface IExperience extends ISchema {
    id?: string,
    type: string,
    title: string,
    description: string,
    platform: string,
    stack: string[],
    imageUrls?: string[],
    iconUrl?: string,
    releasedUrl: string,
    demoUrl: string,
    createdAt?: any
}
interface IExperienceState {
    status: "idle" | "loading" | "error",
    message?: string,
    icon?: any,
    images: any[],
    value: IExperience,
    isValid: boolean
}
// type TDispatchExperience = (state: IExperienceState) => IExperienceState