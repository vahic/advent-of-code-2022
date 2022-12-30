
export function get_item_priority(item:string):number{
    return is_uppercase(item) ?
        item.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
        item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
}

function is_uppercase(str:string):boolean{
    return str === str.toUpperCase()
}