import { SectionRange, useSectionRanges } from "./common.ts";

function isFullyContainedIn(
  maybeContainee: SectionRange,
  maybeContainer: SectionRange,
): boolean {
  return maybeContainee.start >= maybeContainer.start &&
    maybeContainee.end <= maybeContainer.end;
}


const overlappingRanges = useSectionRanges().filter((sectionRanges) =>
  isFullyContainedIn(sectionRanges[0], sectionRanges[1]) ||
  isFullyContainedIn(sectionRanges[1], sectionRanges[0])
)

console.log(overlappingRanges.length)