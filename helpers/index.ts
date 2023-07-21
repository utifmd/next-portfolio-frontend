/*
* CONSTANTS
* */
export const CALL_API: string = "CALL_API"
export const BROWSER_API: string = "BROWSER_API"
export const NEXT_PUBLIC_BASE_URL: string = "NEXT_PUBLIC_BASE_URL"
export const NEXT_PUBLIC_TOKEN: string = "NEXT_PUBLIC_TOKEN"
export const REVALIDATE_IN_SECONDS: number = 5
// export const placeholder: string = "data:image/png;base64,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"
export const placeholder: string = "data:image/png;base64,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"
export enum FileUploadField {
    SINGLE = "image-upload", MULTIPLE = "images-upload"
}
export enum FileDeleteField {
    SINGLE = "image-delete", MULTIPLE = "images-delete"
}
/*
* TOOLS
* */
export function censorEmail(email: string){
    let out = ""
    for (let i = 0; i < email.length; i++){
        out += i >= email.indexOf("@") ? email[i] : "*"
    }
    return out
}
export function camelize(str: string) {
    return str.replace(/^\w|[A-Z]|\b\w/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
export function capitalize(str: string) {
    return str.replace(str[0], str[0].toUpperCase())
}

export const attachmentKeys = (platform: string): [string, string] =>
    platform === 'ANDROID' || platform === 'IOS'
        ? ['Released apps', 'Download'] : ['Link address', 'Visit']
export const isUrl = (value: string): boolean => {
    try {
        const {protocol} = new URL(value)
        return protocol === 'http:' || protocol === 'https:'
    } catch(e){
        return false;
    }
}
export const isBase64 = (value: string) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);
export function readFileAsImgSrcAsync(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        const base64 = reader.readAsDataURL(file)
        reader.onload = () => typeof reader.result === "string"
            ? resolve(reader.result) : reject("File type does not supported")
        reader.onerror = e => {
            console.log(e)
            reject(e)
        }
    })
}
export function readFileAsImgSrc(file: any) {
    let output: any
    const reader = new FileReader()
    const base64 = reader.readAsDataURL(file)
    reader.onload = () => {
        output = reader.result
    }
    reader.onerror = e => {
        console.log(e)
        output = null
    }
    return output
}
export function paginateListOf<T>(list: T[], page: number, size: number): T[] {
    const output: any[] = []
    let paged: T[] = []
    for (let i = 0; i < list.length; i+= size){
        const paginated: T[] = list.slice(i, i +size)
        output.push(paginated)
    }
    for (let i = 0; i < output.length; i++){
        if (i === (page -1)) paged = output[i] as T[]
    }
    return paged
}
export function groupingListByPropKey<T>(list: T, propKey: string): T {
    if (!Array.isArray(list)) return list

    for (let i = 0; i < list.length; i++){
        for (let j = 0; j < list.length; j++){
            if (propKey in list[i]){
                [list[i], list[j]] = [list[j], list[i]]
            }
        }
    }
    return list
}
export const mapUrlToId = (url: string) => {
    const urlItems = url.split("/")
    return urlItems[urlItems.length -1]
}
export const mapExperienceToFormData = (experience: any): FormData => {
    const formData = new FormData()
    const multipleFiles = experience[FileUploadField.MULTIPLE]
    const singleFiles = experience[FileUploadField.SINGLE]

    for (const [key, value] of Object.entries(experience)) {
        if (typeof value === "string" && value.length > 0)
            formData.append(key, value)

        if (Array.isArray(value) && value.length > 0)
            formData.append(key, JSON.stringify(value))
    }
    if(singleFiles) formData.append(FileUploadField.SINGLE, singleFiles, singleFiles.name)
    if (multipleFiles) {
        for (const file of multipleFiles)
            formData.append(FileUploadField.MULTIPLE, file, file.name)
    }
    return formData
}