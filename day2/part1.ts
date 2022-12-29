import {use_day_2_input} from '../inputs/inputs.ts'
import { match } from 'ts-pattern';
import { sum } from "lodash";

enum HandShape {
    Rock = 'Rock',
    Paper = 'Paper',
    Scissors = 'Scissors'
}

interface Round {
    yourChoice: HandShape,
    opponentChoice: HandShape
}

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

function score_round(round:Round):number {
    const shapeScore = match(round.yourChoice)
        .with(HandShape.Rock, () => 1)
        .with(HandShape.Paper, () => 2)
        .with(HandShape.Scissors, () => 3)
        .exhaustive()

    const isTie = round.opponentChoice === round.yourChoice

    const isLost = 
        round.yourChoice === HandShape.Rock && round.opponentChoice === HandShape.Paper ||
        round.yourChoice === HandShape.Paper && round.opponentChoice === HandShape.Scissors ||
        round.yourChoice === HandShape.Scissors && round.opponentChoice === HandShape.Rock;

    
    const outcomeScore = isTie ? 3 : (isLost ? 0 : 6)

    return shapeScore + outcomeScore
}


const rounds = use_day_2_input().map(parse_round)


const scores = rounds.map(score_round)

console.log(sum(scores))