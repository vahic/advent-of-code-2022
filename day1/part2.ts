import { use_total_calories_per_elf } from "./common.ts";
import { sum } from "lodash";

const totalCalPerElf = use_total_calories_per_elf()

totalCalPerElf.sort()

const top3 = totalCalPerElf.slice(-3)

console.log(sum(top3))