import React, { useState } from 'react';
import { Plan, MealType, DailyMenu } from '../types';
import { RECIPES } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  plan: Plan;
  setPlan: (p: Plan) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MealScheduler: React.FC<Props> = ({ plan, setPlan, onNext, onBack }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Helper to get available count of a recipe
  const getRemainingCount = (recipeId: string) => {
    const totalSelected = plan.mealCounts[recipeId] || 0;
    let used = 0;
    Object.values(plan.schedule).forEach(week => {
      Object.values(week).forEach(day => {
        (['breakfast', 'lunch', 'snack', 'dinner'] as const).forEach(type => {
            if (day[type].tomas === recipeId) used++;
            else if (day[type].agos === recipeId) used++; 
        });
      });
    });
    return totalSelected - used;
  };

  const assignMeal = (dayIndex: number, mealType: MealType, recipeId: string) => {
    const newPlan = { ...plan };
    if (!newPlan.schedule[currentWeek]) newPlan.schedule[currentWeek] = {};
    if (!newPlan.schedule[currentWeek][dayIndex]) {
        newPlan.schedule[currentWeek][dayIndex] = {
            breakfast: { tomas: null, agos: null },
            lunch: { tomas: null, agos: null },
            snack: { tomas: null, agos: null },
            dinner: { tomas: null, agos: null },
        };
    }

    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;

    const targetSlot = newPlan.schedule[currentWeek][dayIndex][mealType];

    if (recipe.owner === 'Both') {
        targetSlot.tomas = recipeId;
        targetSlot.agos = recipeId;
    } else if (recipe.owner === 'Tomas') {
        targetSlot.tomas = recipeId;
    } else if (recipe.owner === 'Agos') {
        targetSlot.agos = recipeId;
    }

    setPlan(newPlan);
  };

  const clearSlot = (dayIndex: number, mealType: MealType, person: 'tomas' | 'agos') => {
    const newPlan = { ...plan };
    if (newPlan.schedule[currentWeek]?.[dayIndex]?.[mealType]) {
        newPlan.schedule[currentWeek][dayIndex][mealType][person] = null;
    }
    setPlan(newPlan);
  };

  const renderCell = (dayIndex: number, mealType: MealType) => {
    const dayData = plan.schedule[currentWeek]?.[dayIndex]?.[mealType] || { tomas: null, agos: null };
    
    // Derived state for display
    const tRecipe = RECIPES.find(r => r.id === dayData.tomas);
    const aRecipe = RECIPES.find(r => r.id === dayData.agos);
    
    const isShared = tRecipe && aRecipe && tRecipe.id === aRecipe.id;

    return (
        <div className="bg-gray-50 p-2 rounded min-h-[80px] text-sm border border-dashed border-gray-300 relative group">
            {/* Display Assigned Meals */}
            {isShared ? (
                 <div className="bg-purple-100 text-purple-900 p-1 rounded mb-1 text-xs relative">
                    <span className="font-bold mr-1">{tRecipe.emoji}</span>
                    {tRecipe.name}
                    <button 
                        onClick={() => {
                            clearSlot(dayIndex, mealType, 'tomas');
                            clearSlot(dayIndex, mealType, 'agos');
                        }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    >×</button>
                 </div>
            ) : (
                <>
                    {tRecipe && (
                        <div className="bg-blue-100 text-blue-900 p-1 rounded mb-1 text-xs relative">
                            <span className="font-bold mr-1">{tRecipe.emoji}</span>
                            <span className="font-semibold">T:</span> {tRecipe.name}
                            <button onClick={() => clearSlot(dayIndex, mealType, 'tomas')} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100">×</button>
                        </div>
                    )}
                    {aRecipe && (
                        <div className="bg-pink-100 text-pink-900 p-1 rounded mb-1 text-xs relative">
                            <span className="font-bold mr-1">{aRecipe.emoji}</span>
                            <span className="font-semibold">A:</span> {aRecipe.name}
                            <button onClick={() => clearSlot(dayIndex, mealType, 'agos')} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100">×</button>
                        </div>
                    )}
                </>
            )}

            {/* Selector Dropdown (Simulated with simple native select for mobile friendliness) */}
            {(!tRecipe || !aRecipe || (tRecipe.id !== aRecipe.id)) && (
                <select 
                    className="w-full mt-1 text-xs border rounded bg-white p-1 opacity-50 focus:opacity-100"
                    onChange={(e) => assignMeal(dayIndex, mealType, e.target.value)}
                    value=""
                >
                    <option value="" disabled>+ Añadir</option>
                    {RECIPES
                        .filter(r => r.type === mealType)
                        .filter(r => getRemainingCount(r.id) > 0)
                        .map(r => (
                        <option key={r.id} value={r.id}>
                            {r.emoji} {r.name} ({getRemainingCount(r.id)})
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
  };

  const days = ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'];
  const mealTypes: MealType[] = ['breakfast', 'lunch', 'snack', 'dinner'];
  const mealLabels = { breakfast: 'Desayuno', lunch: 'Almuerzo', snack: 'Snack', dinner: 'Cena' };

  return (
    <div className="space-y-4 pb-24">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <button 
            disabled={currentWeek === 0}
            onClick={() => setCurrentWeek(c => c - 1)}
            className="p-2 disabled:opacity-30"
        >
            <ChevronLeft />
        </button>
        <span className="font-bold text-lg">Semana {currentWeek + 1}</span>
        <button 
            disabled={currentWeek === plan.weeks - 1}
            onClick={() => setCurrentWeek(c => c + 1)}
            className="p-2 disabled:opacity-30"
        >
            <ChevronRight />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
                <tr>
                    <th className="p-2 border-b"></th>
                    {days.map((d, i) => <th key={i} className="p-2 border-b text-center bg-gray-100 min-w-[120px]">{d}</th>)}
                </tr>
            </thead>
            <tbody>
                {mealTypes.map(type => (
                    <tr key={type}>
                        <th className="p-2 border-r bg-gray-50 font-medium text-sm">{mealLabels[type]}</th>
                        {days.map((_, dayIndex) => (
                            <td key={dayIndex} className="p-1 border text-center align-top">
                                {renderCell(dayIndex, type)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between z-10">
        <button onClick={onBack} className="px-6 py-2 text-gray-600 font-medium">Atrás</button>
        <button 
            onClick={onNext}
            className="px-6 py-2 bg-primary text-white rounded-lg shadow-lg font-medium hover:bg-blue-600"
        >
            Plan de Entrenamiento
        </button>
      </div>
    </div>
  );
};