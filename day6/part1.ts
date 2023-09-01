import { use_day_input } from "../inputs/inputs.ts";

const buffer = use_day_input(6)

const workingBuffer = buffer.slice(3)
const initialPadding = buffer.slice(0,3)

interface PacketStartSearch {
    packetStartIndex: null|number,
    previous: string[]
}


function isPacketStart(previous:string[], current:string){
    return new Set([...previous, current]).size === 4
}

const searchResult = workingBuffer.reduce((search:PacketStartSearch, current:string, index:number):PacketStartSearch =>  search.packetStartIndex !== null ? search : {
    packetStartIndex: isPacketStart(search.previous, current) ? index : null,
    previous: [...search.previous.slice(1), current]
}
, { packetStartIndex: null, previous: initialPadding })

const packetStartIndex = (searchResult.packetStartIndex ?? 0) + 3 + 1 //Adding 3 for the 3 chars in the initial padding + 1 because answer is expected counting from 1 to x

console.log(packetStartIndex)