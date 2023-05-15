export function groupingListByPropKey<T>(list: T, propKey: string): T {
    for (let i = 0; i < list.length; i++){
        for (let j = 0; j < list.length; j++){
            if (propKey in list[i]){
                [list[i], list[j]] = [list[j], list[i]]
            }
        }
    }
    return list
}