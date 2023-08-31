import {use_day_input} from '../inputs/inputs.ts'
import {sum, chunk} from 'lodash'
import {get_item_priority} from './common.ts'

const sackContentsByGroup = chunk(use_day_input(3), 3) as string[][]

function find_common_chars(strings:string[]):string {

    if(strings.length > 1){
        const strToTest = strings.slice(-1).pop()

        if(strToTest === undefined) {
            return ''
        }

        return find_common_chars(strings.slice(0, strings.length - 1))
            .split('')
            .filter(char => strToTest.search(char) !== -1)
            .join('')
    }

    return strings[0] ?? ''
}

const groupPriorities = sackContentsByGroup
    .map(groupSacks => find_common_chars(groupSacks).charAt(0))
    .map(get_item_priority)

console.log(sum(groupPriorities))