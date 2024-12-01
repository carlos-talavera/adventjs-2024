function prepareGifts(gifts: number[]): number[] {
  const giftsWithoutDuplicates = new Set(gifts);
  const sortedGiftsWithoutDuplicates = [...giftsWithoutDuplicates].sort(
    (a, b) => a - b
  );
  return sortedGiftsWithoutDuplicates;
}

/* Could this be simplified in a one-liner? Yeah, but wouldn't be as readable from my perspective. */
function prepareGifts2(gifts: number[]): number[] {
  return [...new Set(gifts)].sort((a, b) => a - b);
}