export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';
export type Owner = 'Tomas' | 'Agos' | 'Both';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: 'Carnicería' | 'Mercado' | 'Lácteos' | 'Despensa' | 'Otros';
}

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  type: MealType;
  owner: Owner;
  description?: string; // Portions text e.g., "Tomas 180g, Agos 150g"
  ingredients: Ingredient[];
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface DailyWorkout {
  tomas: string[]; // Array of Exercise IDs
  agos: string[]; // Array of Exercise IDs
}

export interface DailyMenu {
  breakfast: { tomas: string | null; agos: string | null };
  lunch: { tomas: string | null; agos: string | null };
  snack: { tomas: string | null; agos: string | null };
  dinner: { tomas: string | null; agos: string | null };
}

export interface Plan {
  id: string;
  name: string;
  createdAt: number;
  weeks: number; // 1 to 4
  // Meal Selection Counts: Map<RecipeID, Count>
  mealCounts: Record<string, number>; 
  // Schedule: Map<WeekIndex, Map<DayIndex, DailyMenu>>
  schedule: Record<number, Record<number, DailyMenu>>;
  // Workout: Map<WeekIndex, Map<DayIndex, DailyWorkout>>
  workout: Record<number, Record<number, DailyWorkout>>;
}

export type ViewState = 'LIST' | 'QUICK_FINDER' | 'CREATE_SETUP' | 'FILTER_INGREDIENTS' | 'CREATE_MEALS' | 'CREATE_SCHEDULE' | 'CREATE_WORKOUT' | 'VIEW_MENU' | 'VIEW_SHOPPING' | 'VIEW_WORKOUT';
