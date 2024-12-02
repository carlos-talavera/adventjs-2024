// First iteration
// Initial solution
function createFrame(names: string[]): string {
  const FRAME_DELIMITING_CHARACTER = "*";
  const SPACE_CHARACTER = " ";
  const MARGIN_SPACES = 2;

  let longestName = names[0];
  const rows: string[] = [];

  for (let i = 1; i < names.length; i++) {
    if (names[i].length > longestName.length) {
      longestName = names[i];
    }
  }

  const frameWidth =
    longestName.length +
    MARGIN_SPACES + 2;

  rows.push(FRAME_DELIMITING_CHARACTER.repeat(frameWidth));

  for (const name of names) {
    const paddingSpaces = longestName.length - name.length;
    let row = FRAME_DELIMITING_CHARACTER;
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += name;
    row += SPACE_CHARACTER.repeat(paddingSpaces);
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += FRAME_DELIMITING_CHARACTER;
    rows.push(row);
  }

  rows.push(FRAME_DELIMITING_CHARACTER.repeat(frameWidth));

  return rows.join("\n");
}

// Second iteration
// Replace for loop with reduce to get longest name
function createFrame2(names: string[]): string {
  const FRAME_DELIMITING_CHARACTER = "*";
  const SPACE_CHARACTER = " ";
  const MARGIN_SPACES = 2;

  const rows: string[] = [];

  const longestName = names.reduce((oldName, newName) => {
    if (newName.length > oldName.length) return newName;
    return oldName;
  }, "");

  const frameWidth = longestName.length + MARGIN_SPACES + 2;

  rows.push(FRAME_DELIMITING_CHARACTER.repeat(frameWidth));

  for (const name of names) {
    const paddingSpaces = longestName.length - name.length;
    let row = FRAME_DELIMITING_CHARACTER;
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += name;
    row += SPACE_CHARACTER.repeat(paddingSpaces);
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += FRAME_DELIMITING_CHARACTER;
    rows.push(row);
  }

  rows.push(FRAME_DELIMITING_CHARACTER.repeat(frameWidth));

  return rows.join("\n");
}

// Third iteration
// Store border row in a variable and reuse it to avoid recalculating character repetition
function createFrame3(names: string[]): string {
  const FRAME_DELIMITING_CHARACTER = "*";
  const SPACE_CHARACTER = " ";
  const MARGIN_SPACES = 2;

  const rows: string[] = [];

  const longestName = names.reduce((oldName, newName) => {
    if (newName.length > oldName.length) return newName;
    return oldName;
  }, "");

  const frameWidth = longestName.length + MARGIN_SPACES + 2;

  const borderRow = FRAME_DELIMITING_CHARACTER.repeat(frameWidth);
  rows.push(borderRow);

  for (const name of names) {
    const paddingSpaces = longestName.length - name.length;
    let row = FRAME_DELIMITING_CHARACTER;
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += name;
    row += SPACE_CHARACTER.repeat(paddingSpaces);
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += FRAME_DELIMITING_CHARACTER;
    rows.push(row);
  }

  rows.push(borderRow);

  return rows.join("\n");
}

// Fourth iteration
// Simplify longest name calculation to only get the length (which is what we're interested in) instead of the string
function createFrame4(names: string[]): string {
  const FRAME_DELIMITING_CHARACTER = "*";
  const SPACE_CHARACTER = " ";
  const MARGIN_SPACES = 2;

  const rows: string[] = [];

  const longestNameLength = names.reduce(
    (max, name) => Math.max(max, name.length),
    0
  );

  const frameWidth = longestNameLength + MARGIN_SPACES + 2;

  const borderRow = FRAME_DELIMITING_CHARACTER.repeat(frameWidth);
  rows.push(borderRow);

  for (const name of names) {
    const paddingSpaces = longestNameLength - name.length;
    let row = FRAME_DELIMITING_CHARACTER;
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += name;
    row += SPACE_CHARACTER.repeat(paddingSpaces);
    row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
    row += FRAME_DELIMITING_CHARACTER;
    rows.push(row);
  }

  rows.push(borderRow);

  return rows.join("\n");
}

// Fifth iteration
// Refactor to apply separation of concerns
const FRAME_DELIMITING_CHARACTER = "*";
const SPACE_CHARACTER = " ";
const MARGIN_SPACES = 2;
function createFrame5(names: string[]): string {
  const longestNameLength = getLongestNameLength(names);
  const frameWidth = calculateFrameWidth(longestNameLength);

  const rows = constructFrame(names, longestNameLength, frameWidth);

  return rows.join("\n");
}

function getLongestNameLength(names: string[]): number {
  return names.reduce((max, name) => Math.max(max, name.length), 0);
}

function calculateFrameWidth(longestNameLength: number): number {
  return longestNameLength + MARGIN_SPACES + 2;
}

function constructFrame(names: string[], longestNameLength: number, frameWidth: number): string[] {
  const rows: string[] = [];

  const borderRow = FRAME_DELIMITING_CHARACTER.repeat(frameWidth);
  rows.push(borderRow);

  for (const name of names) {
    const paddingSpaces = longestNameLength - name.length;
    const row = constructRow(name, paddingSpaces);
    rows.push(row);
  }

  rows.push(borderRow);

  return rows;
}

function constructRow(name: string, paddingSpaces: number): string {
  let row = FRAME_DELIMITING_CHARACTER;
  row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
  row += name;
  row += SPACE_CHARACTER.repeat(paddingSpaces);
  row += SPACE_CHARACTER.repeat(MARGIN_SPACES / 2);
  row += FRAME_DELIMITING_CHARACTER;

  return row;
}