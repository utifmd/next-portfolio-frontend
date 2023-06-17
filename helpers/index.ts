/*
* CONSTANTS
* */
export const CALL_API: string = "CALL_API"
export const BROWSER_API: string = "BROWSER_API"
export enum FileUploadField {
    SINGLE = "image-upload", MULTIPLE = "images-upload"
}
/*
* TOOLS
* */
export const mapUrlToId = (url: string) => {
    const urlItems = url.split("/")
    return urlItems[urlItems.length -1]
}