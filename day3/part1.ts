import {use_day_3_input} from '../inputs/inputs.ts'
import {sum} from 'lodash'

function split_string(str:string): [string, string]{
    const middleIndex = str.length / 2

    return [
        str.slice(0, middleIndex),
        str.slice(middleIndex)
    ]
}

function find_duplicate_item(compartmentsContent :[string, string]):string {
    const [firstCompartment, secondCompartment] = compartmentsContent

    const duplicateItem = firstCompartment
        .split('')
        .find(char => secondCompartment.search(char) !== -1)

    if(duplicateItem === undefined){
        throw 'Found no duplicate item'
    }

    return duplicateItem
}

function get_item_priority(item:string):number{
    return is_uppercase(item) ?
        item.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
        item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
}


function is_uppercase(str:string):boolean{
    return str === str.toUpperCase()
}


const duplicateItems = use_day_3_input().map(split_string).map(find_duplicate_item)

const itemPriorities = duplicateItems.map(get_item_priority)

console.log(sum(itemPriorities))