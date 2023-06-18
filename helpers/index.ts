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
export const mapExperienceToFormData = (experience: any): FormData => {
    const formData = new FormData()
    const multipleFiles = experience[FileUploadField.MULTIPLE]
    const singleFiles = experience[FileUploadField.SINGLE]

    for (const [key, value] of Object.entries(experience)) {
        if (typeof value === "string" && value.length > 0)
            formData.append(key, value)

        if (Array.isArray(value))
            for(const i in value) formData.append(key, value[i])
    }
    if(typeof singleFiles !== "undefined")
        formData.append(FileUploadField.SINGLE, singleFiles, singleFiles.name)

    if (typeof multipleFiles !== "undefined") {
        for (const file of multipleFiles)
            formData.append(FileUploadField.MULTIPLE, file, file.name)
    }
    return formData
}