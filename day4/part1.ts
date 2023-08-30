import { use_day_4_input } from "../inputs/inputs.ts";

interface SectionRange {
  start: number;
  end: number;
}

function parseSectionRange(toParse: string) {
  const [start, end] = toParse.split("-").map(n => parseInt(n));

  return { start, end };
}

function isFullyContainedIn(
  maybeContainee: SectionRange,
  maybeContainer: SectionRange,
): boolean {
  return maybeContainee.start >= maybeContainer.start &&
    maybeContainee.end <= maybeContainer.end;
}

const sectionRanges: SectionRange[][] = use_day_4_input().map(
  (sectionRangesPair: string) => {
    const sections = sectionRangesPair.split(",");
    return sections.map(parseSectionRange);
  },
);

const overlappingRanges = sectionRanges.filter((sectionRanges) =>
  isFullyContainedIn(sectionRanges[0], sectionRanges[1]) ||
  isFullyContainedIn(sectionRanges[1], sectionRanges[0])
)

console.log(overlappingRanges.length)