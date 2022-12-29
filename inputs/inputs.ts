import { detect as detectEOL } from "std/fs/eol.ts";

export function use_day_1_input(){
    const inputText = Deno.readTextFileSync("./inputs/day1.txt")
    return inputText.split(detectEOL(inputText) ?? "")
}
