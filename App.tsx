import React, { useState, useEffect } from 'react';
import { Plan, ViewState } from './types';
import { PlanCard } from './components/PlanCard';
import { MealSelection } from './features/MealSelection';
import { MealScheduler } from './features/MealScheduler';
import { WorkoutPlanner } from './features/WorkoutPlanner';
import { Dashboard } from './features/Dashboard';
import { IngredientFilter } from './features/IngredientFilter';
import { QuickFinder } from './features/QuickFinder';
import { PlusCircle, ChefHat } from 'lucide-react';
import { PageBackground, GlassCard, GlassButton, GlassInput, GlassSelect } from './components/UI';

const STORAGE_KEY = 'tomas_agos_plans_v1';

// Move ContentWrapper outside to prevent re-mounting on every render
const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <>
      <PageBackground />
      <div className="relative z-10 font-sans text-slate-800">
          {children}
      </div>
    </>
);

const App: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [view, setView] = useState<ViewState>('LIST');
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  // LIFTED STATE: Control wizard step here to persist across data updates
  const [mealWizardStep, setMealWizardStep] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            setPlans(JSON.parse(saved));
        } catch(e) { console.error("Error loading plans", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  const createPlan = () => {
    const newPlan: Plan = {
        id: Date.now().toString(),
        name: `Plan ${new Date().toLocaleDateString('es-ES')}`,
        createdAt: Date.now(),
        weeks: 1,
        mealCounts: {},
        schedule: {},
        workout: {}
    };
    setActivePlan(newPlan);
    setSelectedIngredients([]);
    setMealWizardStep(0); // Reset wizard step for new plan
    setView('CREATE_SETUP');
  };

  const handlePlanUpdate = (p: Plan) => {
    setActivePlan(p);
  };
  
  const toggleIngredient = (ing: string) => {
      if (selectedIngredients.includes(ing)) {
          setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
      } else {
          setSelectedIngredients([...selectedIngredients, ing]);
      }
  };

  const saveAndExit = (p: Plan) => {
      const idx = plans.findIndex(plan => plan.id === p.id);
      if (idx >= 0) {
          const newPlans = [...plans];
          newPlans[idx] = p;
          setPlans(newPlans);
      } else {
          setPlans([...plans, p]);
      }
      setActivePlan(null);
      setView('LIST');
  };

  const deletePlan = (id: string) => {
      if(confirm('¿Estás seguro de eliminar este plan?')) {
          setPlans(plans.filter(p => p.id !== id));
      }
  };

  // --- Render Views ---

  if (view === 'LIST') {
      return (
          <ContentWrapper>
            <div className="max-w-2xl mx-auto p-6 min-h-screen">
                <div className="flex flex-col gap-6 mb-10 text-center sm:text-left">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
                        Planes T&A
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                        <GlassButton 
                            variant="secondary"
                            onClick={() => setView('QUICK_FINDER')}
                        >
                            <ChefHat size={20} className="text-orange-500" /> ¿Qué como hoy?
                        </GlassButton>
                        <GlassButton 
                            variant="primary"
                            onClick={createPlan}
                        >
                            <PlusCircle size={20} /> Nuevo Plan
                        </GlassButton>
                    </div>
                </div>
                
                <div className="space-y-4">
                    {plans.length === 0 && (
                        <GlassCard className="p-10 text-center border-dashed border-2 border-slate-300/50 bg-white/30">
                            <p className="text-slate-500 text-lg">No hay planes guardados.</p>
                            <p className="text-sm text-slate-400 mt-2">Crea uno nuevo para empezar.</p>
                        </GlassCard>
                    )}
                    {plans.map(p => (
                        <PlanCard 
                            key={p.id} 
                            plan={p} 
                            onSelect={(p) => { setActivePlan(p); setView('VIEW_MENU'); }} 
                            onDelete={deletePlan} 
                        />
                    ))}
                </div>
            </div>
          </ContentWrapper>
      );
  }

  if (view === 'QUICK_FINDER') {
      return <ContentWrapper><QuickFinder onExit={() => setView('LIST')} /></ContentWrapper>;
  }

  if (view === 'CREATE_SETUP' && activePlan) {
      return (
          <ContentWrapper>
            <div className="min-h-screen flex items-center justify-center p-4">
                <GlassCard className="w-full max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Configuración del Plan</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2 pl-1">Nombre</label>
                            <GlassInput 
                                type="text" 
                                value={activePlan.name} 
                                onChange={(e: any) => handlePlanUpdate({...activePlan, name: e.target.value})}
                                placeholder="Ej: Semana de Febrero"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2 pl-1">Duración (semanas)</label>
                            <div className="relative">
                                <GlassSelect 
                                    value={activePlan.weeks} 
                                    onChange={(e: any) => handlePlanUpdate({...activePlan, weeks: Number(e.target.value)})}
                                >
                                    <option value={1}>1 Semana</option>
                                    <option value={2}>2 Semanas</option>
                                    <option value={3}>3 Semanas</option>
                                    <option value={4}>4 Semanas</option>
                                </GlassSelect>
                            </div>
                        </div>
                        <div className="flex justify-between pt-6">
                            <GlassButton variant="ghost" onClick={() => setView('LIST')}>Cancelar</GlassButton>
                            <GlassButton onClick={() => setView('FILTER_INGREDIENTS')}>Siguiente</GlassButton>
                        </div>
                    </div>
                </GlassCard>
            </div>
          </ContentWrapper>
      );
  }
  
  if (view === 'FILTER_INGREDIENTS' && activePlan) {
      return (
          <ContentWrapper>
            <div className="max-w-3xl mx-auto p-4 pt-10">
                <IngredientFilter 
                    selectedIngredients={selectedIngredients}
                    onToggleIngredient={toggleIngredient}
                    setSelectedIngredients={setSelectedIngredients} // Pass the setter for 'Select All'
                    onNext={() => {
                        setMealWizardStep(0); // Ensure we start at step 0
                        setView('CREATE_MEALS');
                    }}
                    onBack={() => setView('CREATE_SETUP')}
                />
            </div>
          </ContentWrapper>
      );
  }

  if (view === 'CREATE_MEALS' && activePlan) {
      return (
          <ContentWrapper>
            <div className="max-w-3xl mx-auto p-4 pt-10">
                <MealSelection 
                    plan={activePlan} 
                    setPlan={handlePlanUpdate} 
                    selectedIngredients={selectedIngredients}
                    currentStep={mealWizardStep}       // Pass state from parent
                    setCurrentStep={setMealWizardStep} // Pass setter from parent
                    onNext={() => setView('CREATE_SCHEDULE')}
                    onBack={() => setView('FILTER_INGREDIENTS')}
                />
            </div>
          </ContentWrapper>
      );
  }

  if (view === 'CREATE_SCHEDULE' && activePlan) {
      return (
        <ContentWrapper>
            <div className="max-w-5xl mx-auto p-4 pt-6">
                <MealScheduler
                    plan={activePlan}
                    setPlan={handlePlanUpdate}
                    onNext={() => setView('CREATE_WORKOUT')}
                    onBack={() => setView('CREATE_MEALS')}
                />
            </div>
        </ContentWrapper>
      );
  }

  if (view === 'CREATE_WORKOUT' && activePlan) {
      return (
          <ContentWrapper>
            <div className="max-w-4xl mx-auto p-4 pt-6">
                <WorkoutPlanner
                    plan={activePlan}
                    setPlan={handlePlanUpdate}
                    onNext={() => saveAndExit(activePlan)}
                    onBack={() => setView('CREATE_SCHEDULE')}
                />
            </div>
          </ContentWrapper>
      );
  }

  if ((view === 'VIEW_MENU' || view === 'VIEW_SHOPPING' || view === 'VIEW_WORKOUT') && activePlan) {
      return <ContentWrapper><Dashboard plan={activePlan} onExit={() => setView('LIST')} /></ContentWrapper>;
  }

  return <div>Error de estado</div>;
};

export default App;