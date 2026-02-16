import React, { useCallback } from 'react';
import { Recipe, Plan, MealType } from '../types';
import { RECIPES } from '../constants';
import { GlassCard } from '../components/UI';
import { ArrowRight, SkipForward, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';

interface Props {
  plan: Plan;
  setPlan: (p: Plan) => void;
  selectedIngredients: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MealSelection: React.FC<Props> = ({ 
    plan, 
    setPlan, 
    selectedIngredients, 
    currentStep, 
    setCurrentStep, 
    onNext, 
    onBack 
}) => {

  const sections: { title: string; type: MealType; emoji: string; description: string }[] = [
    { title: 'Desayunos', type: 'breakfast', emoji: '🍳', description: 'Para empezar el día con energía.' },
    { title: 'Almuerzos', type: 'lunch', emoji: '🥗', description: 'Platos principales para el mediodía.' },
    { title: 'Cenas', type: 'dinner', emoji: '🌙', description: 'Opciones ligeras o nutritivas para cerrar el día.' },
    { title: 'Snacks', type: 'snack', emoji: '🍎', description: 'Pequeñas comidas para la media tarde.' },
  ];

  const activeSection = sections[currentStep];

  // LOGICA BOOLEANA "INFINITA"
  // Al seleccionar, asignamos 7 (uno para cada dia de la semana) para que esté "Disponible" en el calendario múltiples veces.
  // Al deseleccionar, borramos la entrada.
  const toggleRecipe = useCallback((recipeId: string) => {
    const currentCount = plan.mealCounts[recipeId] || 0;
    const isSelected = currentCount > 0;
    
    const newCounts = { ...plan.mealCounts };
    
    if (isSelected) {
        delete newCounts[recipeId]; // Deseleccionar
    } else {
        newCounts[recipeId] = 7; // Seleccionar (Disponible toda la semana)
    }

    setPlan({
      ...plan,
      mealCounts: newCounts
    });
  }, [plan, setPlan]);

  // Helper: Calcular puntaje de coincidencia de ingredientes
  const getRecipeScore = useCallback((recipe: Recipe) => {
    if (selectedIngredients.length === 0) return 0;
    const recipeIngs = recipe.ingredients.map(i => i.name.toLowerCase());
    let score = 0;
    selectedIngredients.forEach(sel => {
        if (recipeIngs.some(ri => ri.includes(sel.toLowerCase()))) {
            score += 1;
        }
    });
    return score;
  }, [selectedIngredients]);

  // Obtener recetas ordenadas para la sección actual
  // Usamos un filtro simple directo en el render para asegurar que se refresque visualmente
  const currentRecipes = RECIPES
    .filter(r => r.type === activeSection.type)
    .sort((a, b) => getRecipeScore(b) - getRecipeScore(a));

  // Calcular si hay ALGO seleccionado en esta categoría
  const selectionCountInCurrentStep = currentRecipes.reduce((acc, recipe) => {
    return acc + (plan.mealCounts[recipe.id] ? 1 : 0);
  }, 0);

  const hasSelection = selectionCountInCurrentStep > 0;

  // Manejadores de navegación
  const handleStepNext = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNext();
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="pb-40 min-h-screen relative">
      {/* Header del Wizard */}
      <div className="mb-6 sticky top-0 bg-slate-50/95 backdrop-blur-sm z-30 py-4 border-b border-slate-200/50">
        <div className="flex items-center justify-between text-sm font-medium text-slate-400 mb-2">
            <span>Paso {currentStep + 1} de {sections.length}</span>
            <span className="uppercase tracking-widest text-xs font-bold text-slate-300">{activeSection.type}</span>
        </div>
        {/* Barra de progreso */}
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
            />
        </div>
      </div>

      {/* Título de la Sección */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <span className="text-4xl filter drop-shadow-sm">{activeSection.emoji}</span> 
            {activeSection.title}
        </h2>
        <p className="text-slate-500 mt-1 ml-1 text-sm">{activeSection.description}</p>
        
        {selectedIngredients.length > 0 && (
            <div className="mt-3 ml-1 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100/50 border border-green-200 text-xs font-bold text-green-700">
                <span>✨</span> Priorizado por tu alacena
            </div>
        )}
      </div>

      {/* Grid de Recetas - ESTILO CHECKBOX GIGANTE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
        {currentRecipes.map(recipe => {
          const isSelected = (plan.mealCounts[recipe.id] || 0) > 0;
          const matchScore = getRecipeScore(recipe);
          const isMatch = matchScore > 0;

          return (
            <GlassCard 
                key={recipe.id}
                onClick={() => toggleRecipe(recipe.id)}
                className={`group relative p-4 cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                    isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50/80 shadow-blue-200 shadow-lg' 
                        : 'hover:bg-white/80 hover:shadow-md border border-transparent'
                } ${!isSelected && isMatch ? 'bg-green-50/30' : ''}`}
            >
              <div className="flex justify-between items-start">
                  <div className="flex-1 pr-10">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-3xl filter drop-shadow-sm">{recipe.emoji}</span>
                        <div>
                            <h4 className={`font-bold leading-tight text-lg ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                                {recipe.name}
                            </h4>
                            <div className="text-xs mt-1.5 flex flex-wrap gap-2">
                                <span className={`px-2 py-0.5 rounded-md font-medium text-[10px] uppercase tracking-wide border ${
                                    recipe.owner === 'Both' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                    recipe.owner === 'Tomas' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-pink-50 text-pink-700 border-pink-100'
                                }`}>
                                    {recipe.owner === 'Both' ? 'Compartido' : recipe.owner}
                                </span>
                                {isMatch && (
                                    <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[10px] font-bold border border-green-200 flex items-center gap-1">
                                        ★ Recomendado
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* Checkbox Icon */}
                  <div className={`absolute top-4 right-4 transition-all duration-300 ${isSelected ? 'text-blue-600 scale-110' : 'text-slate-300'}`}>
                      {isSelected ? (
                          <CheckCircle2 size={28} className="fill-blue-100" />
                      ) : (
                          <Circle size={28} strokeWidth={1.5} />
                      )}
                  </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* --- SMART FOOTER BAR --- */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        {/* Blur gradient backdrop for footer */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent pointer-events-none h-32 bottom-0 top-auto" />
        
        <div className="relative max-w-3xl mx-auto px-6 pb-8 pt-6 flex flex-col gap-3">
            
            <div className="flex items-center gap-4">
                {/* Botón Atrás */}
                <button 
                    onClick={handleStepBack}
                    className="p-4 rounded-full bg-white border border-slate-200 shadow-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors backdrop-blur-sm"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* BOTÓN DE ACCIÓN DINÁMICO */}
                <button
                    onClick={handleStepNext}
                    className={`flex-1 group relative overflow-hidden rounded-2xl p-4 shadow-xl transition-all duration-300 ease-out flex items-center justify-center gap-3 font-bold text-lg ${
                        hasSelection 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01]' 
                            : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                    {hasSelection ? (
                        <>
                            <span>Confirmar ({selectionCountInCurrentStep})</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                    ) : (
                        <>
                            <span className="font-medium text-slate-400">Saltar {activeSection.title}</span>
                            <SkipForward size={20} className="text-slate-400 opacity-50 group-hover:opacity-100" />
                        </>
                    )}
                </button>
            </div>
            
            {/* Reassurance Text */}
            <p className="text-center text-[10px] text-slate-400 font-medium">
                {hasSelection 
                    ? 'Estos platos quedarán disponibles en tu calendario.' 
                    : 'Puedes dejar esta categoría vacía si haces ayuno.'}
            </p>
        </div>
      </div>
    </div>
  );
};