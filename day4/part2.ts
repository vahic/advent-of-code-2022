import { SectionRange, useSectionRanges } from "./common.ts";

function overlaps(
  range1: SectionRange,
  range2: SectionRange,
): boolean {
  if (range1.start === range2.start) return true;
  const [smallestStartRange, biggerStartRange] = range1.start < range2.start
    ? [range1, range2]
    : [range2, range1];

  return smallestStartRange.end >= biggerStartRange.start;
}

const overlappingRanges = useSectionRanges().filter((sectionRanges) =>
  overlaps(sectionRanges[0], sectionRanges[1])
);

console.log(overlappingRanges.length);
