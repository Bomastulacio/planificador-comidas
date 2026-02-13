import React from 'react';
import { Recipe, Plan, MealType } from '../types';
import { RECIPES } from '../constants';
import { GlassCard, GlassButton } from '../components/UI';

interface Props {
  plan: Plan;
  setPlan: (p: Plan) => void;
  selectedIngredients: string[];
  onNext: () => void;
  onBack: () => void;
}

export const MealSelection: React.FC<Props> = ({ plan, setPlan, selectedIngredients, onNext, onBack }) => {
  const updateCount = (recipeId: string, delta: number) => {
    const current = plan.mealCounts[recipeId] || 0;
    const newCount = Math.max(0, current + delta);
    setPlan({
      ...plan,
      mealCounts: { ...plan.mealCounts, [recipeId]: newCount }
    });
  };

  const getRecipeScore = (recipe: Recipe) => {
    if (selectedIngredients.length === 0) return 0;
    const recipeIngs = recipe.ingredients.map(i => i.name.toLowerCase());
    let score = 0;
    selectedIngredients.forEach(sel => {
        if (recipeIngs.some(ri => ri.includes(sel.toLowerCase()))) {
            score += 1;
        }
    });
    return score;
  };

  const getSortedRecipes = (type: MealType) => {
      const typeRecipes = RECIPES.filter(r => r.type === type);
      return typeRecipes.sort((a, b) => getRecipeScore(b) - getRecipeScore(a));
  };

  const sections: { title: string; type: MealType }[] = [
    { title: 'Desayunos', type: 'breakfast' },
    { title: 'Almuerzos', type: 'lunch' },
    { title: 'Cenas', type: 'dinner' },
    { title: 'Snacks', type: 'snack' },
  ];

  const totalDays = plan.weeks * 7;

  return (
    <div className="space-y-8 pb-24">
      <GlassCard className="p-6 border-l-4 border-blue-500">
        <h2 className="font-bold text-xl text-slate-800 mb-2">Selecciona las comidas</h2>
        <p className="text-slate-600">
            Escoge cuántas veces comerán cada plato en total durante los <strong>{totalDays} días</strong>.
        </p>
        {selectedIngredients.length > 0 && (
            <p className="text-xs text-green-600 mt-2 font-medium bg-green-50 inline-block px-2 py-1 rounded-full">
                ✨ Recetas recomendadas basadas en tus ingredientes
            </p>
        )}
      </GlassCard>

      {sections.map(section => (
        <div key={section.type} className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800 pl-2">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getSortedRecipes(section.type).map(recipe => {
              const count = plan.mealCounts[recipe.id] || 0;
              const matchScore = getRecipeScore(recipe);
              const isMatch = matchScore > 0;

              return (
                <GlassCard 
                    key={recipe.id} 
                    className={`p-4 flex justify-between items-center transition-all ${isMatch ? 'ring-2 ring-green-400/50 bg-green-50/30' : ''}`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-3xl filter drop-shadow-sm" role="img" aria-label="meal">{recipe.emoji}</span>
                        <h4 className="font-bold text-slate-800 leading-tight">{recipe.name}</h4>
                    </div>
                    <div className="text-xs mt-2 flex flex-wrap gap-2">
                        <span className={`px-2 py-0.5 rounded-md font-medium ${
                            recipe.owner === 'Both' ? 'bg-purple-100/80 text-purple-700' :
                            recipe.owner === 'Tomas' ? 'bg-blue-100/80 text-blue-700' : 'bg-pink-100/80 text-pink-700'
                        }`}>
                            {recipe.owner === 'Both' ? 'Ambos' : recipe.owner}
                        </span>
                        {isMatch && (
                            <span className="px-2 py-0.5 rounded-md bg-green-100/80 text-green-700 font-bold">
                                Recomendado
                            </span>
                        )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center gap-1 bg-white/40 p-1 rounded-xl backdrop-blur-sm border border-white/50 shadow-inner">
                    <button 
                        onClick={() => updateCount(recipe.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-lg text-green-600 hover:bg-green-100 font-bold shadow-sm transition-all active:scale-95"
                    >
                        +
                    </button>
                    <span className="font-bold text-lg text-slate-700 w-6 text-center">{count}</span>
                    <button 
                        onClick={() => updateCount(recipe.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-lg text-red-500 hover:bg-red-100 font-bold shadow-sm transition-all active:scale-95"
                    >
                        -
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 w-full p-4 z-50 pointer-events-none">
        <div className="max-w-3xl mx-auto flex justify-between items-center pointer-events-auto">
             <GlassButton variant="secondary" onClick={onBack} className="shadow-xl">Atrás</GlassButton>
             <GlassButton variant="primary" onClick={onNext} className="shadow-xl shadow-blue-500/40">
                Continuar al Horario
             </GlassButton>
        </div>
      </div>
    </div>
  );
};