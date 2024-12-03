type Inventory = Array<{ name: string; quantity: number; category: string }>;

// First iteration
// Initial solution
function organizeInventory(inventory: Inventory): object {
  const result = {};

  inventory.forEach((toy) => {
    const key = toy.category;
    if (!result[key]) result[key] = {};

    let quantity = toy.quantity;

    if (result[key][toy.name]) {
      quantity += result[key][toy.name];
    }

    result[key] = {
      ...result[key],
      [toy.name]: quantity,
    };
  });

  return result;
}

// Second iteration
// Use an or operator instead of an if statement to add the existing quantity
function organizeInventory2(inventory: Inventory): object {
  const result = {};

  inventory.forEach((toy) => {
    const key = toy.category;
    if (!result[key]) result[key] = {};

    result[key] = {
      ...result[key],
      [toy.name]: toy.quantity + (result[key][toy.name] || 0),
    };
  });

  return result;
}

// Third iteration
// Use an or operator to check for the existence of the category in the result object
function organizeInventory3(inventory: Inventory): object {
  const result = {};

  inventory.forEach((toy) => {
    const key = toy.category;

    result[key] = {
      ...(result[key] || {}),
      [toy.name]: toy.quantity + (result[key]?.[toy.name] || 0),
    };
  });

  return result;
}

// Fourth iteration
// Substitute the forEach with a reduce to avoid creating an extra object for the result
// Destructure the toy object to uniformly use the name, category, and quantity properties (better naming)
// Go back to the if statement to check if the category exists in the result object (it's prettier this way)
// This is the way I would do it in production
function organizeInventory4(inventory: Inventory): object {
  return inventory.reduce((acc, toy) => {
    const { name, category, quantity } = toy;
    if (!acc[category]) acc[category] = {};

    acc[category][name] = (acc[category][name] || 0) + quantity;

    return acc;
  }, {});
}

// Fifth iteration
// Use the nullish coalescing operator along with the assignment operator to avoid the if statement
// and the or operator (wouldn't do it this way in production because 
// these operators combined are difficult to understand, but this was the only way to get five stars)
function organizeInventory5(inventory: Inventory): object {
  return inventory.reduce((acc, toy) => {
    const { name, category, quantity } = toy;
    acc[category] ??= {};
    acc[category][name] ??= 0;
    acc[category][name] += quantity;
    return acc;
  }, {});
}