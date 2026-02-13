import React from 'react';
import { ChevronRight } from 'lucide-react';
import { COMMON_INGREDIENTS } from '../constants';

interface Props {
  selectedIngredients: string[];
  onToggleIngredient: (ingredient: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IngredientFilter: React.FC<Props> = ({ selectedIngredients, onToggleIngredient, onNext, onBack }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border">
      <h2 className="text-xl font-bold mb-2">¿Qué tienes en la alacena?</h2>
      <p className="text-gray-600 text-sm mb-6">
        Selecciona los ingredientes que ya tienes o quieres usar. Te recomendaremos recetas con ellos primero.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {COMMON_INGREDIENTS.map(ing => {
          const isSelected = selectedIngredients.includes(ing);
          return (
            <button
              key={ing}
              onClick={() => onToggleIngredient(ing)}
              className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                isSelected 
                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {ing}
              {isSelected && <span className="ml-2">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800">
          Atrás
        </button>
        <button 
          onClick={onNext}
          className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-lg"
        >
          Ver Recetas <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};