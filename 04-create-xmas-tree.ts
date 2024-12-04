// First iteration
// Initial solution
function createXmasTree(height: number, ornament: string): string {
  const SPACE_CHARACTER = "_";
  const TRUNK_CHARACTER = "#";

  const rowLength = 2 * height - 1;
  const rows: string[] = [];

  for (let i = 1; i <= height; i++) {
    const ornamentCharacters = 2 * i - 1;
    const spacesPerSide = (rowLength - ornamentCharacters) / 2;
    let row = SPACE_CHARACTER.repeat(spacesPerSide);
    row += ornament.repeat(ornamentCharacters);
    row += SPACE_CHARACTER.repeat(spacesPerSide);
    rows.push(row);
  }

  const trunkSpacesPerSide = (rowLength - 1) / 2;
  const trunkRow =
    SPACE_CHARACTER.repeat(trunkSpacesPerSide) +
    TRUNK_CHARACTER +
    SPACE_CHARACTER.repeat(trunkSpacesPerSide);

  for (let i = 1; i <= 2; i++) {
    rows.push(trunkRow);
  }

  return rows.join("\n");
}

// Second iteration
// Replace the loop for pushing trunk rows with pushing the trunk row twice
function createXmasTree2(height: number, ornament: string): string {
  const SPACE_CHARACTER = "_";
  const TRUNK_CHARACTER = "#";

  const rowLength = 2 * height - 1;
  const rows: string[] = [];

  for (let i = 1; i <= height; i++) {
    const ornamentCharacters = 2 * i - 1;
    const spacesPerSide = (rowLength - ornamentCharacters) / 2;
    let row = SPACE_CHARACTER.repeat(spacesPerSide);
    row += ornament.repeat(ornamentCharacters);
    row += SPACE_CHARACTER.repeat(spacesPerSide);
    rows.push(row);
  }

  const trunkSpacesPerSide = (rowLength - 1) / 2;
  const trunkRow =
    SPACE_CHARACTER.repeat(trunkSpacesPerSide) +
    TRUNK_CHARACTER +
    SPACE_CHARACTER.repeat(trunkSpacesPerSide);

  rows.push(trunkRow, trunkRow);

  return rows.join("\n");
}

// Third iteration
// Extract common row creation logic into a function
function createXmasTree3(height: number, ornament: string): string {
  const SPACE_CHARACTER = "_";
  const TRUNK_CHARACTER = "#";

  const rowLength = 2 * height - 1;
  const rows: string[] = [];

  function createRow(content: string, padding: number): string {
    return (
      SPACE_CHARACTER.repeat(padding) +
      content +
      SPACE_CHARACTER.repeat(padding)
    );
  }

  for (let i = 1; i <= height; i++) {
    const ornamentCharacters = 2 * i - 1;
    const spacesPerSide = (rowLength - ornamentCharacters) / 2;
    rows.push(createRow(ornament.repeat(ornamentCharacters), spacesPerSide));
  }

  const trunkSpacesPerSide = (rowLength - 1) / 2;
  const trunkRow = createRow(TRUNK_CHARACTER, trunkSpacesPerSide);

  rows.push(trunkRow, trunkRow);

  return rows.join("\n");
}

// Fourth iteration
// Refactor to apply a greater separation of concerns
const SPACE_CHARACTER = "_";
const TRUNK_CHARACTER = "#";
function createXmasTree4(height: number, ornament: string): string {
  const rows = createRows(height, ornament);
  return rows.join("\n");
}

function calculateRowLength(height: number): number {
  return 2 * height - 1;
}

function createRow(content: string, padding: number): string {
  return (
    SPACE_CHARACTER.repeat(padding) + content + SPACE_CHARACTER.repeat(padding)
  );
}

function createRows(
  height: number,
  ornament: string
): string[] {
  const rowLength = calculateRowLength(height);
  const rows: string[] = [];

  for (let i = 1; i <= height; i++) {
    const ornamentCharacters = 2 * i - 1;
    const spacesPerSide = (rowLength - ornamentCharacters) / 2;
    rows.push(createRow(ornament.repeat(ornamentCharacters), spacesPerSide));
  }

  const trunkRow = createTrunkRow(rowLength);

  rows.push(trunkRow, trunkRow);

  return rows;
}

function createTrunkRow(rowLength: number): string {
  const trunkSpacesPerSide = (rowLength - 1) / 2;
  const trunkRow = createRow(TRUNK_CHARACTER, trunkSpacesPerSide);

  return trunkRow;
}