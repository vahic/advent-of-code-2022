import {use_day_input} from '../inputs/inputs.ts'
import { match } from 'ts-pattern';
import { sum } from "lodash";
import { Round, HandShape, score_round } from './common.ts';


function parse_round(roundData:string):Round {
    const [oppLetter, yourLetter] = roundData.split(' ')

    const opponentChoice = match(oppLetter)
        .with('A', () => HandShape.Rock)
        .with('B', () => HandShape.Paper)
        .with('C', () => HandShape.Scissors)
        .run();

        
    const yourChoice = match(yourLetter)
        .with('X', () => HandShape.Rock)
        .with('Y', () => HandShape.Paper)
        .with('Z', () => HandShape.Scissors)
        .run();

    return { yourChoice, opponentChoice }
}

const rounds = use_day_input(2).map(parse_round)

const scores = rounds.map(score_round)

console.log(sum(scores))