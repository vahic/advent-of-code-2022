import { use_day_input } from "../inputs/inputs.ts";
import { range, reverse } from "lodash";
import { reduce } from "https://esm.sh/v102/@types/lodash@4.14.191/index";


interface Instruction {
    from: number,
    to: number,
    amount: number
}

type Stacks = string[][]

const inputText = use_day_input(5);

const containerStacksText = inputText.slice(0, 8)

const instructionsText = inputText.slice(9)


function parseStacks(stacksText:string[]):Stacks{
    return range(1, 10).map((n: number) => {
        return reverse( //Reverse order so the bottom of the stack is at the beginning of the array
          stacksText
            .map((line) => line[4 * n - 3]) // get the columns with letters in them
            .filter((char) => char !== " "), // filter voids
        )
      })
}

function parseInstruction(instructionsText:string):Instruction {
    const notADigit = /[^\d*]/g
    const [amount, from, to] = instructionsText.split(/from|to/).map(str => str.replace(notADigit, '')).map(str => parseInt(str))
    return {
        amount,
        from,
        to
    }
}

function executeInstruction(stacks:Stacks, instruction:Instruction):Stacks {
    return stacks.map((stack, index) => {
        const stackNumber:number = index + 1
        if(stackNumber === instruction.from){
            return stack.slice(0, stack.length - instruction.amount)
        }
        if(stackNumber === instruction.to){
            return [ ...stack, ...stacks[instruction.from - 1].slice(-instruction.amount) ]
        }
        return stack
    })
}

const containerStacks = parseStacks(containerStacksText)

const instructions = instructionsText.map(parseInstruction)

const finalStacks = instructions.reduce((stacks, instruction) => executeInstruction(stacks, instruction), containerStacks)

console.log(finalStacks.map(stack => stack[stack.length - 1]).join(''))