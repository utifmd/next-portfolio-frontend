interface IProfileLinks {
    id?: string,
    linkedin: string,
    github: string,
    twitter: string,
    stackOverflow: string,
    instagram: string,
    medium: string,
    resume: string,
    email: string,
    profileId: string
}
interface IProfileData {
    id?: string,
    title: string,
    description: string,
    profileId: string,
    type: "HABIT" | "INTRO",
}
interface IProfile extends ISchema {
    id?: string,
    fullName: string,
    imageUrl: string,
    bio: string,
    role: "OWNER" | "GUEST",
    jobTitle: string,
    links?: IProfileLinks,
    data?: IProfileData[],
    createdAt?: string,
    updatedAt?: string
}
interface IProfileState {
    status: "idle" | "loading" | "error",
    message?: string,
    useCaseDataId?: string,
    useCase: "main" | "data" | "link",
    isValid: boolean,
    isSubmitted: boolean,
    image?: any,
    removableImageUrls: string[],
    value: IProfile
}