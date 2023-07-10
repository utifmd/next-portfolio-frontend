interface IProfileLinks {
    linkedin: string,
    github: string,
    twitter: string,
    stackOverflow: string,
    instagram: string,
    medium: string,
    resume: string,
    email: string
}
interface IProfileData {
    id?: string,
    title: string,
    description: string,
    type: "habit" | "intro",
}
interface IProfile extends ISchema {
    id?: string,
    fullName: string,
    imageUrl: string,
    bio: string,
    role: string,
    jobTitle: string,
    links?: any,
    data?: any,
    createdAt?: string,
    updatedAt?: string
}
interface IProfileState {
    status: "idle" | "loading" | "error",
    message?: string,
    isValid: boolean,
    isSubmitted: boolean,
    isSelected?: boolean,
    image?: any,
    removableImageUrls: string[],
    value?: IProfile
}