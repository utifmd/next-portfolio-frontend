interface IExperience extends ISchema {
    id: string,
    type: string,
    title: string,
    description: string,
    platform: string,
    stack: string[],
    imageUrls: string[],
    iconUrl: string,
    releasedUrl: string,
    demoUrl: string,
    createdAt: string
}
interface IExperienceState {
    status: "idle" | "loading" | "error",
    value: IExperience
}
// type TDispatchExperience = (state: IExperienceState) => IExperienceState