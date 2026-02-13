import React, { useState, useMemo } from 'react';
import { RECIPES, COMMON_INGREDIENTS } from '../constants';
import { ArrowLeft, ChefHat, Filter } from 'lucide-react';
import { GlassCard, GlassButton } from '../components/UI';

interface Props {
  onExit: () => void;
}

type Group = 'breakfast' | 'lunch' | null;

export const QuickFinder: React.FC<Props> = ({ onExit }) => {
  const [selectedGroup, setSelectedGroup] = useState<Group>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggleIngredient = (ing: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ing)) {
        return prev.filter(i => i !== ing);
      } else {
        return [...prev, ing];
      }
    });
  };

  const filteredRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    let recipes = RECIPES;

    if (selectedGroup === 'breakfast') {
      recipes = recipes.filter(r => r.type === 'breakfast' || r.type === 'snack');
    } else if (selectedGroup === 'lunch') {
      recipes = recipes.filter(r => r.type === 'lunch' || r.type === 'dinner');
    }

    const results = recipes.map(r => {
        const matchCount = r.ingredients.filter(ing => 
          selectedIngredients.some(sel => ing.name.toLowerCase().includes(sel.toLowerCase()))
        ).length;
        return { ...r, matchCount };
      })
      .filter(r => r.matchCount > 0);

    return results.sort((a, b) => b.matchCount - a.matchCount);

  }, [selectedGroup, selectedIngredients]);

  return (
    <div className="max-w-3xl mx-auto p-4 min-h-screen pb-20">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button onClick={onExit} className="p-3 bg-white/50 backdrop-blur rounded-full shadow-sm hover:bg-white/80 transition-all">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                ¿Qué como hoy? <ChefHat className="text-orange-500" size={32} /> 
            </h1>
        </div>
      </div>

      <div className="space-y-8">
        {/* Step 1 */}
        <section>
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-3 ml-1">1. ¿Qué buscas?</h3>
            <div className="grid grid-cols-2 gap-4">
            <GlassCard 
                onClick={() => setSelectedGroup('breakfast')}
                className={`p-6 text-center border-2 ${selectedGroup === 'breakfast' ? 'border-orange-400 bg-orange-50/50' : 'border-transparent hover:bg-white/80'}`}
            >
                <span className="text-4xl block mb-2 filter drop-shadow-sm">🍳</span>
                <span className="font-bold text-slate-700">Desayuno</span>
            </GlassCard>
            <GlassCard 
                onClick={() => setSelectedGroup('lunch')}
                className={`p-6 text-center border-2 ${selectedGroup === 'lunch' ? 'border-green-400 bg-green-50/50' : 'border-transparent hover:bg-white/80'}`}
            >
                <span className="text-4xl block mb-2 filter drop-shadow-sm">🥗</span>
                <span className="font-bold text-slate-700">Comida</span>
            </GlassCard>
            </div>
        </section>

        {/* Step 2 */}
        <section>
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-3 ml-1">2. ¿Qué tienes?</h3>
            <GlassCard className="p-5 flex flex-wrap gap-2">
            {COMMON_INGREDIENTS.map(ing => (
                <button
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedIngredients.includes(ing)
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white/50 text-slate-600 hover:bg-white/80'
                }`}
                >
                {ing}
                </button>
            ))}
            </GlassCard>
        </section>

        {/* Step 3 */}
        <section>
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-3 ml-1">3. Sugerencias</h3>

            {selectedIngredients.length === 0 ? (
                <GlassCard className="text-center py-12 border-dashed border-2 border-slate-300/50">
                    <p className="text-slate-400">Selecciona ingredientes para ver la magia.</p>
                </GlassCard>
            ) : filteredRecipes.length === 0 ? (
                <GlassCard className="text-center py-12">
                    <p className="text-slate-500">No encontramos recetas exactas 😔</p>
                    <p className="text-sm text-slate-400">Intenta con otros ingredientes.</p>
                </GlassCard>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredRecipes.map(r => (
                        <GlassCard key={r.id} className="p-5 hover:scale-[1.02] transition-transform">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl filter drop-shadow-sm">{r.emoji}</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg leading-none">{r.name}</h4>
                                        <div className="flex gap-2 mt-2">
                                            {r.matchCount > 0 && (
                                                <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-xs font-bold shadow-sm">
                                                    {r.matchCount} coinciden
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-3 border-t border-slate-100">
                                <div className="flex flex-wrap gap-1 text-sm">
                                    {r.ingredients.map((ing, idx) => {
                                        const isMatch = selectedIngredients.some(sel => ing.name.toLowerCase().includes(sel.toLowerCase()));
                                        return (
                                            <span key={idx} className={`px-1.5 py-0.5 rounded ${isMatch ? "bg-green-100 text-green-800 font-semibold" : "text-slate-500"}`}>
                                                {ing.name}{idx < r.ingredients.length - 1 ? "," : ""}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </section>
      </div>
    </div>
  );
};