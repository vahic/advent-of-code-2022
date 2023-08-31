import {use_day_input} from '../inputs/inputs.ts'
import {sum} from 'lodash'
import {get_item_priority} from './common.ts'

export function split_string(str:string): [string, string]{
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

const duplicateItems = use_day_input(3).map(split_string).map(find_duplicate_item)

const itemPriorities = duplicateItems.map(get_item_priority)

console.log(sum(itemPriorities))