import { Plan, Ingredient, Recipe, DailyMenu } from './types';
import { RECIPES } from './constants';

export const getRecipe = (id: string | null): Recipe | undefined => {
  if (!id) return undefined;
  return RECIPES.find(r => r.id === id);
};

export const generateShoppingList = (plan: Plan): Record<string, string[]> => {
  const aggregated: Record<string, { quantity: number; unit: string; category: string }> = {};

  // Iterate through entire schedule
  for (let w = 0; w < plan.weeks; w++) {
    const weekSchedule = plan.schedule[w] || {};
    for (let d = 0; d < 7; d++) {
      const dayMenu = weekSchedule[d];
      if (!dayMenu) continue;

      (['breakfast', 'lunch', 'snack', 'dinner'] as const).forEach(mealType => {
        const slot = dayMenu[mealType];
        
        // Process Tomas
        if (slot.tomas) {
            addIngredients(slot.tomas, aggregated, true);
        }
        
        // Process Agos (if distinct from Tomas, or if recipe is individual)
        // See comments in previous logic re: shared meals
      });
    }
  }
  
  // Re-implementation of loop for correct shared meal logic
   for (let w = 0; w < plan.weeks; w++) {
    const weekSchedule = plan.schedule[w] || {};
    for (let d = 0; d < 7; d++) {
      const dayMenu = weekSchedule[d];
      if (!dayMenu) continue;

      (['breakfast', 'lunch', 'snack', 'dinner'] as const).forEach(mealType => {
        const slot = dayMenu[mealType];
        const tId = slot.tomas;
        const aId = slot.agos;

        if (tId === aId && tId !== null) {
            // Same recipe ID. 
            const r = getRecipe(tId);
            if (r) {
                if (r.owner === 'Both') {
                    addIngredients(tId, aggregated, false); // Add once
                } else {
                    // Two individual portions of the same meal (unlikely but possible)
                    addIngredients(tId, aggregated, false);
                    addIngredients(tId, aggregated, false);
                }
            }
        } else {
            // Different recipes or one is null
            if (tId) addIngredients(tId, aggregated, false);
            if (aId) addIngredients(aId, aggregated, false);
        }
      });
    }
   }

  // Format Output
  const result: Record<string, string[]> = {};
  
  Object.entries(aggregated).forEach(([name, data]) => {
    if (!result[data.category]) result[data.category] = [];
    // Round to 2 decimals
    const qty = Math.round(data.quantity * 100) / 100;
    result[data.category].push(`${name} (${qty} ${data.unit})`);
  });

  return result;
};

const addIngredients = (recipeId: string, agg: Record<string, any>, isHalf: boolean) => {
    const recipe = getRecipe(recipeId);
    if (!recipe) return;

    recipe.ingredients.forEach(ing => {
        if (!agg[ing.name]) {
            agg[ing.name] = { quantity: 0, unit: ing.unit, category: ing.category };
        }
        agg[ing.name].quantity += ing.quantity;
    });
};

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

export const formatDate = (date: number) => {
    return new Date(date).toLocaleDateString('es-ES');
};