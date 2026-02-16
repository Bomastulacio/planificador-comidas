import React, { useState } from 'react';
import { Plan, Exercise } from '../types';
import { EXERCISES } from '../constants';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

interface Props {
  plan: Plan;
  setPlan: (p: Plan) => void;
  onNext: () => void;
  onBack: () => void;
}

export const WorkoutPlanner: React.FC<Props> = ({ plan, setPlan, onNext, onBack }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const addExercise = (day: number, person: 'tomas' | 'agos', exerciseId: string) => {
      const newPlan = { ...plan };
      if (!newPlan.workout[currentWeek]) newPlan.workout[currentWeek] = {};
      if (!newPlan.workout[currentWeek][day]) {
          newPlan.workout[currentWeek][day] = { tomas: [], agos: [] };
      }
      
      const list = newPlan.workout[currentWeek][day][person];
      if (!list.includes(exerciseId)) {
          list.push(exerciseId);
      }
      setPlan(newPlan);
  };

  const removeExercise = (day: number, person: 'tomas' | 'agos', exerciseId: string) => {
    const newPlan = { ...plan };
    if (newPlan.workout[currentWeek]?.[day]?.[person]) {
        newPlan.workout[currentWeek][day][person] = newPlan.workout[currentWeek][day][person].filter(id => id !== exerciseId);
    }
    setPlan(newPlan);
  };

  // Quick Copy Tomas -> Agos or vice versa
  const copyRoutine = (day: number, from: 'tomas' | 'agos', to: 'tomas' | 'agos') => {
    const newPlan = { ...plan };
    if (!newPlan.workout[currentWeek]) newPlan.workout[currentWeek] = {};
    if (!newPlan.workout[currentWeek][day]) newPlan.workout[currentWeek][day] = { tomas: [], agos: [] };
    
    newPlan.workout[currentWeek][day][to] = [...newPlan.workout[currentWeek][day][from]];
    setPlan(newPlan);
  };

  const renderPersonDay = (day: number, person: 'tomas' | 'agos') => {
      const exercises = plan.workout[currentWeek]?.[day]?.[person] || [];
      const color = person === 'tomas' ? 'blue' : 'pink';
      
      return (
          <div className={`flex-1 p-3 rounded-lg bg-${color}-50 border border-${color}-100`}>
             <div className="flex justify-between items-center mb-2">
                 <h4 className={`font-bold text-${color}-700 capitalize`}>{person}</h4>
                 {exercises.length > 0 && (
                     <button 
                        onClick={() => copyRoutine(day, person, person === 'tomas' ? 'agos' : 'tomas')}
                        className="text-xs underline text-gray-500 hover:text-gray-800"
                        title={`Copiar a ${person === 'tomas' ? 'Agos' : 'Tomas'}`}
                     >
                         Copiar ->
                     </button>
                 )}
             </div>
             
             <ul className="space-y-2 mb-3">
                 {exercises.map(exId => {
                     const ex = EXERCISES.find(e => e.id === exId);
                     return (
                         <li key={exId} className="flex justify-between items-start bg-white p-2 rounded text-sm shadow-sm">
                             <span>{ex?.name}</span>
                             <button onClick={() => removeExercise(day, person, exId)} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
                         </li>
                     );
                 })}
                 {exercises.length === 0 && <li className="text-gray-400 text-xs italic">Descanso</li>}
             </ul>

             <select 
                className="w-full text-xs p-2 rounded border bg-white"
                onChange={(e) => {
                    if(e.target.value) {
                        addExercise(day, person, e.target.value);
                        e.target.value = '';
                    }
                }}
             >
                 <option value="">+ Agregar Ejercicio</option>
                 {EXERCISES.map(e => (
                     <option key={e.id} value={e.id}>{e.name} ({e.category})</option>
                 ))}
             </select>
          </div>
      );
  };

  return (
    <div className="space-y-6 pb-24">
       <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <button 
            disabled={currentWeek === 0}
            onClick={() => setCurrentWeek(c => c - 1)}
            className="p-2 disabled:opacity-30"
        >
            <ChevronLeft />
        </button>
        <span className="font-bold text-lg">Semana {currentWeek + 1} - Entrenamiento</span>
        <button 
            disabled={currentWeek === plan.weeks - 1}
            onClick={() => setCurrentWeek(c => c + 1)}
            className="p-2 disabled:opacity-30"
        >
            <ChevronRight />
        </button>
      </div>

      <div className="space-y-6">
        {[0,1,2,3,4,5,6].map(day => (
            <div key={day} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Día {day + 1}</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    {renderPersonDay(day, 'tomas')}
                    {renderPersonDay(day, 'agos')}
                </div>
            </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between z-10">
        <button onClick={onBack} className="px-6 py-2 text-gray-600 font-medium">Atrás</button>
        <button 
            onClick={onNext}
            className="px-6 py-2 bg-secondary text-white rounded-lg shadow-lg font-medium hover:bg-green-600"
        >
            Finalizar y Ver Resumen
        </button>
      </div>
    </div>
  );
};