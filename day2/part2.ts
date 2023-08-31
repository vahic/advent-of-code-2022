import {use_day_input} from '../inputs/inputs.ts'
import { match } from 'ts-pattern';
import { sum } from "lodash";
import { Round, HandShape, score_round, get_countered_shape, get_counter_shape } from './common.ts';



function parse_round(roundData:string):Round {
    const [oppLetter, yourLetter] = roundData.split(' ')

    const opponentChoice = match(oppLetter)
        .with('A', () => HandShape.Rock)
        .with('B', () => HandShape.Paper)
        .with('C', () => HandShape.Scissors)
        .run();

        
    const yourChoice = match(yourLetter)
        .with('X', () => get_countered_shape(opponentChoice)) // X = you must loose
        .with('Y', () => opponentChoice) // Y = you must end in draw
        .with('Z', () => get_counter_shape(opponentChoice)) // Z = you must win
        .run();

    return { yourChoice, opponentChoice }
}


const rounds = use_day_input(2).map(parse_round)

const scores = rounds.map(score_round)

console.log(sum(scores))