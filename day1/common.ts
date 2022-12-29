import { use_day_1_input } from "../inputs/inputs.ts";
import { sum } from "lodash";


const calories = use_day_1_input().map(str => parseInt(str))


function split_calories_per_elf(calories: number[]):number[][]{
    const elfs: number[][] = []

    let currentElfIndex = 0

    calories.forEach((calorieCount) => {
        if(isNaN(calorieCount)){
            currentElfIndex++
            return
        }

        if(!elfs[currentElfIndex]){
            elfs[currentElfIndex] = []
        }

        elfs[currentElfIndex].push(calorieCount)
    })

    return elfs
}

export function use_total_calories_per_elf(){
    return split_calories_per_elf(calories).map((elfCals):number => sum(elfCals))
}