interface IEducation extends ISchema {
    id?: string,
    title: string,
    desc: string,
    content: string,
    fileUrl: string,
    imageUrl: string,
    createdAt?: any
}
interface IEducationState {
    status: "idle" | "loading" | "error",
    message?: string,
    isValid: boolean,
    isSubmitted: boolean,
    isSelected?: boolean,
    image?: any,
    removableImageIds?: string[],
    value: IEducation
}
// type TDispatchEducation = (state: IEducationState) => IEducationState