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
interface IProfile {
    id?: string,
    fullName: string,
    bio: string,
    role: string,
    jobTitle: string,
    links: IProfileLinks,
    createdAt?: string,
    updatedAt?: string
}