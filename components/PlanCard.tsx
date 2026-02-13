import React from 'react';
import { Plan } from '../types';
import { Trash2, Calendar, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils';
import { GlassCard } from './UI';

interface Props {
  plan: Plan;
  onSelect: (plan: Plan) => void;
  onDelete: (id: string) => void;
}

export const PlanCard: React.FC<Props> = ({ plan, onSelect, onDelete }) => {
  return (
    <GlassCard 
        onClick={() => onSelect(plan)} 
        className="p-5 flex justify-between items-center group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex-1">
        <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">{plan.name}</h3>
        <div className="flex items-center text-slate-500 text-sm mt-1">
            <Calendar className="w-4 h-4 mr-1 text-slate-400" />
            <span>{formatDate(plan.createdAt)} • {plan.weeks} semana(s)</span>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center gap-3">
        <button 
            onClick={(e) => { e.stopPropagation(); onDelete(plan.id); }}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
            <Trash2 size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-blue-500 shadow-sm">
            <ChevronRight size={20} />
        </div>
      </div>
    </GlassCard>
  );
};