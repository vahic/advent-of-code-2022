import { instructions, containerStacks, executeInstruction } from './common.ts'

const finalStacks = instructions.reduce(
  (stacks, instruction) => executeInstruction(stacks, instruction, true),
  containerStacks,
);

console.log(finalStacks.map(stack => stack[stack.length - 1]).join(''))
