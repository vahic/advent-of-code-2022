import { detect as detectEOL } from "std/fs/eol.ts";

export function use_day_input(day:number){
    const inputText = Deno.readTextFileSync(`./inputs/day${day}.txt`)
    return inputText.split(detectEOL(inputText) ?? "").filter(str => str.length > 0)
}