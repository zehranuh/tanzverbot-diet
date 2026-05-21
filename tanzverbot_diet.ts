export enum Sex {
  Male = "m",
  Female = "f",
}

const CALORIES_PER_KG_WEIGHT_GAIN = 9000;

const foods = [
  { name: "Kellogg's Tresor", caloriesPerServing: 137, servings: 4 },
  { name: "Weihenstephan Haltbare Milch", caloriesPerServing: 64, servings: 8 },
  { name: "Mühle Frikadellen", caloriesPerServing: 271, servings: 4 },
  { name: "Volvic Tee", caloriesPerServing: 40, servings: 12 },
  { name: "Neuburger lockerer Sahnepudding", caloriesPerServing: 297, servings: 1 },
  { name: "Lagnese Viennetta", caloriesPerServing: 125, servings: 6 },
  { name: "Schöller 10ForTwo", caloriesPerServing: 482, servings: 2 },
  { name: "Ristorante Pizza Salame", caloriesPerServing: 835, servings: 2 },
  { name: "Schweppes Ginger Ale", caloriesPerServing: 37, servings: 25 },
  { name: "Mini Babybel", caloriesPerServing: 59, servings: 20 },
];

function calcBasicMetabolicRate(weightKg: number, heightM: number, ageY: number, sex: Sex): number {
  if (sex === Sex.Male) {
    return Math.ceil(66.47 + 13.7 * weightKg + 5.003 * heightM * 100 - 6.75 * ageY);
  }
  return Math.ceil(655.1 + 9.563 * weightKg + 1.85 * heightM * 100 - 4.676 * ageY);
}

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not losing it!`);
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  let dailyCaloriesOnDiet = 0;
  for (const food of foods) {
    dailyCaloriesOnDiet += food.caloriesPerServing * food.servings;
  }
  
  const dailyCaloriesBasicMetabolicRate = calcBasicMetabolicRate(currentWeightKg, heightM, ageY, sex);
  
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil(
    (CALORIES_PER_KG_WEIGHT_GAIN * weightGainKg) / dailyExcessCalories,
  );
}
