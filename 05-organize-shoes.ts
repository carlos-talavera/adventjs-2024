// First iteration
// Initial solution
type Shoe = {
  type: 'I' | 'R'
  size: number
}

type ShoeTypeAmountsPerSizeMap = Map<Shoe['type'], number>;

function organizeShoes(shoes: Shoe[]): number[] {
  const result: number[] = [];
  const sizeMap = new Map<number, ShoeTypeAmountsPerSizeMap>();

  for (const shoe of shoes) {
    const { type, size } = shoe;
    let shoeTypeAmountsPerSizeMap = sizeMap.get(size);
    if (!shoeTypeAmountsPerSizeMap) {
      sizeMap.set(size, new Map<Shoe['type'], number>());
      shoeTypeAmountsPerSizeMap = sizeMap.get(size) as ShoeTypeAmountsPerSizeMap;
      shoeTypeAmountsPerSizeMap.set('I', 0);
      shoeTypeAmountsPerSizeMap.set('R', 0);
    }

    const currentLeftBoots = shoeTypeAmountsPerSizeMap.get('I') as number;
    const currentRightBoots = shoeTypeAmountsPerSizeMap.get('R') as number;

    if (type === 'I' && currentRightBoots > 0) {
      shoeTypeAmountsPerSizeMap.set('R', currentRightBoots - 1);
      result.push(size);
    } else if (type === 'R' && currentLeftBoots > 0) {
      shoeTypeAmountsPerSizeMap.set('I', currentLeftBoots - 1);
      result.push(size);
    } else {
      const amountToBeAddedTo = type === 'I' ? currentLeftBoots : currentRightBoots;
      shoeTypeAmountsPerSizeMap.set(type, amountToBeAddedTo + 1);
    }
  }

  return result;
}

// Second iteration
// Simplify by using an object instead of a map for the shoe type amounts per size
// and rename the shoe type amounts per size map to shoe counts for brevity
function organizeShoes2(shoes: Shoe[]): number[] {
  const result: number[] = [];
  const sizeMap = new Map<number, { left: number; right: number }>();

  for (const { type, size } of shoes) {
    if (!sizeMap.has(size)) {
      sizeMap.set(size, { left: 0, right: 0 });
    }

    const shoeCounts = sizeMap.get(size)!;

    if (type === 'I') {
      if (shoeCounts.right > 0) {
        shoeCounts.right -= 1;
        result.push(size);
      } else {
        shoeCounts.left += 1;
      }
    } else if (type === 'R') {
      if (shoeCounts.left > 0) {
        shoeCounts.left -= 1;
        result.push(size);
      } else {
        shoeCounts.right += 1;
      }
    }
  }

  return result;
}

// Third iteration
// Simplify by using the opposite shoe type as the key in the shoe counts map
// and rename shoe counts left and right to I and R to simplify use in the else clause
function organizeShoes3(shoes: Shoe[]): number[] {
  const result: number[] = [];
  const sizeMap = new Map<number, { I: number; R: number }>();

  for (const { type, size } of shoes) {
    if (!sizeMap.has(size)) {
      sizeMap.set(size, { I: 0, R: 0 });
    }

    const shoeCounts = sizeMap.get(size)!;

    const opposite = type === 'I' ? 'R' : 'I';

    if (shoeCounts[opposite] > 0) {
      shoeCounts[opposite] -= 1;
      result.push(size);
    } else {
      shoeCounts[type] += 1;
    }
  }

  return result;
}