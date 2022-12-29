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

export function get_counter_shape(choice:HandShape):HandShape {
    return match(choice)
        .with(HandShape.Rock, () => HandShape.Paper)
        .with(HandShape.Paper, () => HandShape.Scissors)
        .with(HandShape.Scissors, () => HandShape.Rock)
        .exhaustive()
}

export function get_countered_shape(choice:HandShape):HandShape {
    return match(choice)
        .with(HandShape.Rock, () => HandShape.Scissors)
        .with(HandShape.Paper, () => HandShape.Rock)
        .with(HandShape.Scissors, () => HandShape.Paper)
        .exhaustive()
}

export function score_round(round:Round):number {
    const shapeScore = match(round.yourChoice)
        .with(HandShape.Rock, () => 1)
        .with(HandShape.Paper, () => 2)
        .with(HandShape.Scissors, () => 3)
        .exhaustive()

    const isTie = round.opponentChoice === round.yourChoice

    const isWon = round.yourChoice === get_counter_shape(round.opponentChoice)
    
    const outcomeScore = isTie ? 3 : (isWon ? 6 : 0)

    return shapeScore + outcomeScore
}