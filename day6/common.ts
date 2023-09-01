interface MarkerSearch {
  markerEndIndex: null | number;
  previous: string[];
}

const isMarkerofSize =
  (size: number) => (previous: string[], current: string) =>
    new Set([...previous, current]).size === size;

export function countCharsBeforeMarker(
  buffer: string[],
  markerSize: number,
): number {
  const workingBuffer = buffer.slice(markerSize - 1);
  const initialPadding = buffer.slice(0, markerSize - 1);
  const isMarker = isMarkerofSize(markerSize);

  const searchResult = workingBuffer.reduce(
    (search: MarkerSearch, current: string, index: number): MarkerSearch =>
      search.markerEndIndex !== null ? search : { // Skip searching after we found the index
        markerEndIndex: isMarker(search.previous, current) ? index : null,
        previous: [...search.previous.slice(1), current],
      },
    { markerEndIndex: null, previous: initialPadding },
  );

  return (searchResult.markerEndIndex ?? 0) + markerSize;
}
