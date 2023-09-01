import { use_day_input } from "../inputs/inputs.ts";
import { countCharsBeforeMarker } from "./common.ts";

const buffer = use_day_input(6);

console.log(countCharsBeforeMarker(buffer, 14));
