import { use_day_input } from "../inputs/inputs.ts";
import { range } from "lodash";

export interface Instruction {
  from: number;
  to: number;
  amount: number;
}

export type Stacks = string[][];

const inputText = use_day_input(5);

const containerStacksText = inputText.slice(0, 8);

const instructionsText = inputText.slice(9);

function parseStacks(stacksText: string[]): Stacks {
  return range(1, 10).map((n: number) =>
    stacksText
      .map((line) => line[4 * n - 3]) // get the columns with letters in them
      .filter((char) => char !== " ") // filter voids
      .reverse() //Reverse order so the bottom of the stack is at the beginning of the array
  );
}

function parseInstruction(instructionsText: string): Instruction {
  const notADigit = /[^\d*]/g;
  const [amount, from, to] = instructionsText.split(/from|to/).map((str) =>
    str.replace(notADigit, "")
  ).map((str) => parseInt(str));
  return {
    amount,
    from,
    to,
  };
}

export function executeInstruction(stacks: Stacks, instruction: Instruction, isCrateMover9001:boolean): Stacks {
  return stacks.map((stack, index) => {
    const stackNumber: number = index + 1;
    if (stackNumber === instruction.from) {
      return stack.slice(0, stack.length - instruction.amount);
    }
    if (stackNumber === instruction.to) {
        const movedCrates = stacks[instruction.from - 1].slice(-instruction.amount)
      return [
        ...stack,
        ... (isCrateMover9001 ? movedCrates : movedCrates.reverse()), // We need to reverse the added crates order when they are moved one at a time
      ];
    }
    return stack;
  });
}

export const containerStacks = parseStacks(containerStacksText);

export const instructions = instructionsText.map(parseInstruction);