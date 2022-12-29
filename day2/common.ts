import { match } from 'ts-pattern';

export enum HandShape {
    Rock = 'Rock',
    Paper = 'Paper',
    Scissors = 'Scissors'
}

export interface Round {
    yourChoice: HandShape,
    opponentChoice: HandShape
}

export function score_round(round:Round):number {
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