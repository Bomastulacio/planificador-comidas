import React, { useMemo } from 'react';
import { ChevronRight, CheckSquare } from 'lucide-react';
import { INGREDIENTS_LIST } from '../constants';
import { GlassCard } from '../components/UI';

interface Props {
  selectedIngredients: string[];
  onToggleIngredient: (ingredient: string) => void;
  setSelectedIngredients: (ingredients: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IngredientFilter: React.FC<Props> = ({ 
    selectedIngredients, 
    onToggleIngredient, 
    setSelectedIngredients,
    onNext, 
    onBack 
}) => {

  const handleSelectAll = () => {
      const allNames = INGREDIENTS_LIST.map(i => i.name);
      setSelectedIngredients(allNames);
  };

  const categories = useMemo(() => {
    return {
        protein: { title: '🍖 Proteínas', items: INGREDIENTS_LIST.filter(i => i.category === 'protein') },
        veggie: { title: '🥦 Verduras', items: INGREDIENTS_LIST.filter(i => i.category === 'veggie') },
        carb: { title: '🍞 Carbos y Despensa', items: INGREDIENTS_LIST.filter(i => i.category === 'carb') },
        dairy: { title: '🥛 Lácteos y Frutas', items: INGREDIENTS_LIST.filter(i => i.category === 'dairy') },
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 pb-24">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/60 mb-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-extrabold text-slate-800">Tu Alacena</h2>
            <button 
                onClick={handleSelectAll}
                className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 flex items-center gap-1 transition-colors"
            >
                <CheckSquare size={14} /> Tengo todo
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            Marca lo que ya tienes. Te recomendaremos recetas priorizando estos ingredientes.
          </p>
      </div>

      <div className="space-y-6">
        {Object.entries(categories).map(([key, group]) => (
            <div key={key} className="animate-fade-in">
                <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-3 ml-1">
                    {group.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {group.items.map(ing => {
                    const isSelected = selectedIngredients.includes(ing.name);
                    return (
                        <button
                        key={ing.name}
                        onClick={() => onToggleIngredient(ing.name)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 flex justify-between items-center group ${
                            isSelected 
                            ? 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-500/20 transform scale-[1.02]' 
                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                        >
                        <span className="font-medium text-sm truncate pr-2">{ing.name}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-white border-transparent' : 'border-slate-300 bg-slate-50'
                        }`}>
                            {isSelected && <span className="text-blue-500 text-xs font-bold">✓</span>}
                        </div>
                        </button>
                    );
                    })}
                </div>
            </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent pointer-events-none h-24 bottom-0 top-auto" />
        <div className="relative max-w-3xl mx-auto px-6 pb-6 flex justify-between items-center">
            <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2">
            Atrás
            </button>
            <button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 font-bold shadow-md"
            >
            Ver Recetas <ChevronRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};