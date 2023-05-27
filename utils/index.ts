export function readFileAsImgSrcAsync(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        const base64 = reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
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
export const attachmentKeys = (platform: string): [string, string] =>
    platform === 'android' || platform === 'ios'
        ? ['Released apps', 'Download'] : ['Link address', 'Visit']

export function camelize(str: string) {
    return str.replace(/^\w|[A-Z]|\b\w/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
export function capitalize(str: string) {
   return str.replace(str[0], str[0].toUpperCase())
}
