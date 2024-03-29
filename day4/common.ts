import { use_day_input } from "../inputs/inputs.ts";

export interface SectionRange {
  start: number;
  end: number;
}

function parseSectionRange(toParse: string) {
  const [start, end] = toParse.split("-").map((n) => parseInt(n));
  return { start, end };
}

export function useSectionRanges(): SectionRange[][] {
  return use_day_input(4).map(
    (sectionRangesPair: string) => {
      const sections = sectionRangesPair.split(",");
      return sections.map(parseSectionRange);
    }
  );
}
