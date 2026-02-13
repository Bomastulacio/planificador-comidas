import React, { useState } from 'react';
import { Plan } from '../types';
import { RECIPES, EXERCISES } from '../constants';
import { generateShoppingList, copyToClipboard } from '../utils';
import { Printer, Copy, ChevronLeft, ChevronRight, ArrowLeft, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GlassCard, GlassButton } from '../components/UI';

interface Props {
  plan: Plan;
  onExit: () => void;
}

type Tab = 'menu' | 'shopping' | 'workout';

export const Dashboard: React.FC<Props> = ({ plan, onExit }) => {
  const [activeTab, setActiveTab] = useState<Tab>('menu');
  const [currentWeek, setCurrentWeek] = useState(0);

  const handlePrint = () => {
    window.print();
  };

  const getSafeDateFilename = () => {
      const date = new Date(plan.createdAt);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `Plan_Tomas_y_Agos_${day}-${month}-${year}.pdf`;
  };

  // --- Views ---

  const WeeklyMenuView = () => {
    const weekData = plan.schedule[currentWeek] || {};
    const days = ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'];
    const meals = ['breakfast', 'lunch', 'snack', 'dinner'] as const;
    
    const downloadMenuPDF = () => {
        const doc = new jsPDF({ orientation: 'landscape' });
        
        doc.setFontSize(18);
        doc.text(`Menú Semanal - Semana ${currentWeek + 1}`, 14, 15);
        doc.setFontSize(10);
        doc.text(`Plan: ${plan.name}`, 14, 22);

        const mealLabels = { breakfast: 'Desayuno', lunch: 'Almuerzo', snack: 'Snack', dinner: 'Cena' };
        const tableBody = meals.map(mealType => {
            const row = [mealLabels[mealType]];
            for (let i = 0; i < 7; i++) {
                const slot = weekData[i]?.[mealType] || { tomas: null, agos: null };
                const tRecipe = RECIPES.find(r => r.id === slot.tomas);
                const aRecipe = RECIPES.find(r => r.id === slot.agos);

                let cellText = "";
                if (tRecipe && aRecipe && tRecipe.id === aRecipe.id) {
                    cellText = `(Ambos) ${tRecipe.name}`;
                } else {
                    if (tRecipe) cellText += `T: ${tRecipe.name}\n`;
                    if (aRecipe) cellText += `A: ${aRecipe.name}`;
                }
                if (!tRecipe && !aRecipe) cellText = "-";
                row.push(cellText);
            }
            return row;
        });

        autoTable(doc, {
            head: [['Comida', ...days]],
            body: tableBody,
            startY: 28,
            theme: 'grid',
            headStyles: { fillColor: [59, 130, 246] },
            styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' }
        });

        doc.save(getSafeDateFilename());
    };

    return (
        <div className="w-full space-y-4">
             <div className="no-print flex justify-between items-center mb-4">
                <GlassCard className="flex items-center gap-4 p-2 !rounded-full">
                    <button disabled={currentWeek === 0} onClick={() => setCurrentWeek(c => c - 1)} className="p-2 hover:bg-white/50 rounded-full disabled:opacity-30"><ChevronLeft size={20}/></button>
                    <span className="font-bold text-slate-700 min-w-[100px] text-center">Semana {currentWeek + 1}</span>
                    <button disabled={currentWeek === plan.weeks - 1} onClick={() => setCurrentWeek(c => c + 1)} className="p-2 hover:bg-white/50 rounded-full disabled:opacity-30"><ChevronRight size={20}/></button>
                </GlassCard>
                <div className="flex gap-2">
                    <GlassButton onClick={downloadMenuPDF} variant="primary" className="!px-4 !py-2 !text-sm">
                        <Download size={16} /> PDF
                    </GlassButton>
                    <GlassButton onClick={handlePrint} variant="secondary" className="!px-4 !py-2 !text-sm">
                        <Printer size={16} /> Imprimir
                    </GlassButton>
                </div>
            </div>

            <div className="print-section bg-white/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/50">
                <div className="grid grid-cols-8 divide-x divide-slate-200/50 divide-y">
                    <div className="bg-white/50 p-3 font-bold text-slate-600 flex items-center justify-center">Comida</div>
                    {days.map(d => <div key={d} className="bg-white/50 p-3 font-bold text-slate-600 text-center">{d}</div>)}

                    {meals.map(meal => (
                        <React.Fragment key={meal}>
                             <div className="bg-slate-50/50 p-3 font-bold text-slate-500 capitalize flex items-center justify-center border-t border-slate-200/50">
                                {meal === 'breakfast' ? 'Desayuno' : meal === 'lunch' ? 'Almuerzo' : meal === 'snack' ? 'Snack' : 'Cena'}
                             </div>
                             {days.map((_, i) => {
                                 const slot = weekData[i]?.[meal] || { tomas: null, agos: null };
                                 const tRecipe = RECIPES.find(r => r.id === slot.tomas);
                                 const aRecipe = RECIPES.find(r => r.id === slot.agos);
                                 const isShared = tRecipe && aRecipe && tRecipe.id === aRecipe.id;

                                 return (
                                     <div key={i} className="p-3 text-xs min-h-[120px] bg-white/20 hover:bg-white/40 transition-colors border-t border-slate-200/50">
                                         {isShared ? (
                                             <div className="mb-1">
                                                <div className="font-bold text-slate-800 text-sm mb-1">{tRecipe.emoji} {tRecipe.name}</div>
                                                <div className="text-slate-500 italic leading-tight">{tRecipe.description}</div>
                                             </div>
                                         ) : (
                                            <div className="space-y-2">
                                                {tRecipe && (
                                                    <div>
                                                        <span className="font-bold text-blue-600">T:</span> <span className="text-slate-800">{tRecipe.name}</span>
                                                        <div className="text-slate-500 italic scale-90 origin-left leading-tight">{tRecipe.description}</div>
                                                    </div>
                                                )}
                                                {aRecipe && (
                                                    <div>
                                                        <span className="font-bold text-pink-600">A:</span> <span className="text-slate-800">{aRecipe.name}</span>
                                                        <div className="text-slate-500 italic scale-90 origin-left leading-tight">{aRecipe.description}</div>
                                                    </div>
                                                )}
                                            </div>
                                         )}
                                     </div>
                                 );
                             })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
  };

  const ShoppingListView = () => {
      const list = generateShoppingList(plan);

      const copyList = () => {
          let text = "";
          Object.entries(list).forEach(([category, items]) => {
              text += `${category}\n`;
              items.forEach(item => text += `- ${item}\n`);
              text += `\n`;
          });
          copyToClipboard(text);
          alert("Lista copiada al portapapeles");
      };

      const downloadShoppingPDF = () => {
          const doc = new jsPDF();
          doc.setFontSize(18);
          doc.text(`Lista de Compras`, 14, 15);
          doc.setFontSize(10);
          doc.text(`Plan: ${plan.name} - Generado el ${new Date().toLocaleDateString('es-ES')}`, 14, 22);

          const tableBody: any[] = [];
          Object.entries(list).forEach(([category, items]) => {
              tableBody.push([{ content: category.toUpperCase(), colSpan: 1, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
              items.forEach(item => tableBody.push([`• ${item}`]));
          });

          autoTable(doc, { body: tableBody, startY: 30, theme: 'plain', styles: { fontSize: 10, cellPadding: 2 } });
          doc.save(getSafeDateFilename().replace('.pdf', '_Compras.pdf'));
      };

      return (
          <div className="w-full">
              <div className="no-print flex justify-end gap-2 mb-4">
                  <GlassButton onClick={downloadShoppingPDF} variant="primary" className="!px-4 !py-2 !text-sm">
                      <Download size={16} /> PDF
                  </GlassButton>
                  <GlassButton onClick={copyList} variant="secondary" className="!px-4 !py-2 !text-sm">
                      <Copy size={16} /> Copiar
                  </GlassButton>
                  <GlassButton onClick={handlePrint} variant="secondary" className="!px-4 !py-2 !text-sm">
                      <Printer size={16} /> Imprimir
                  </GlassButton>
              </div>

              <GlassCard className="print-section p-8 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold mb-8 border-b border-slate-200 pb-4 text-slate-800">Lista de Compras</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.entries(list).map(([category, items]) => (
                          <div key={category} className="break-inside-avoid">
                              <h3 className="font-bold text-lg text-blue-600 mb-3 flex items-center gap-2">
                                  {category}
                                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{items.length}</span>
                              </h3>
                              <ul className="space-y-2">
                                  {items.map((item, idx) => (
                                      <li key={idx} className="text-slate-700 text-sm flex items-start gap-2">
                                          <span className="text-slate-300 mt-1">•</span> {item}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      ))}
                  </div>
              </GlassCard>
          </div>
      );
  };

  const WorkoutView = () => {
      const weekData = plan.workout[currentWeek] || {};
      
      const copyWorkout = () => {
          let text = "";
          if (plan.weeks > 1) text += `**Semana ${currentWeek + 1}**\n`;
          for (let i = 0; i < 7; i++) {
              text += `Dia ${i+1}\n`;
              const tEx = (weekData[i]?.tomas || []).map(id => EXERCISES.find(e => e.id === id)?.name).join(', ');
              const aEx = (weekData[i]?.agos || []).map(id => EXERCISES.find(e => e.id === id)?.name).join(', ');
              if (tEx) text += `Tomas: ${tEx}\n`;
              if (aEx) text += `Agos: ${aEx}\n`;
              text += `\n`;
          }
          copyToClipboard(text);
          alert("Rutina copiada al portapapeles");
      };

      return (
          <div className="w-full">
            <div className="no-print flex justify-between items-center mb-4">
                <GlassCard className="flex items-center gap-4 p-2 !rounded-full">
                    <button disabled={currentWeek === 0} onClick={() => setCurrentWeek(c => c - 1)} className="p-2 hover:bg-white/50 rounded-full disabled:opacity-30"><ChevronLeft size={20}/></button>
                    <span className="font-bold text-slate-700 min-w-[100px] text-center">Semana {currentWeek + 1}</span>
                    <button disabled={currentWeek === plan.weeks - 1} onClick={() => setCurrentWeek(c => c + 1)} className="p-2 hover:bg-white/50 rounded-full disabled:opacity-30"><ChevronRight size={20}/></button>
                </GlassCard>
                <div className="flex gap-2">
                    <GlassButton onClick={copyWorkout} variant="secondary" className="!px-4 !py-2 !text-sm">
                        <Copy size={16} /> Copiar
                    </GlassButton>
                    <GlassButton onClick={handlePrint} variant="secondary" className="!px-4 !py-2 !text-sm">
                        <Printer size={16} /> Imprimir
                    </GlassButton>
                </div>
            </div>

            <div className="print-section">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Plan de Entrenamiento - Semana {currentWeek + 1}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
                    {[0,1,2,3,4,5,6].map(day => (
                        <GlassCard key={day} className="p-6 break-inside-avoid">
                            <h3 className="font-bold text-lg text-slate-700 mb-4 text-center border-b border-slate-100 pb-2">Día {day + 1}</h3>
                            <div className="space-y-4">
                                <div className="bg-blue-50/50 p-3 rounded-xl">
                                    <h4 className="font-bold text-blue-700 text-sm mb-2">Tomas</h4>
                                    <ul className="list-none space-y-1 text-sm">
                                        {(weekData[day]?.tomas || []).length === 0 ? <li className="text-slate-400 italic">Descanso</li> : 
                                         (weekData[day]?.tomas || []).map(id => {
                                             const ex = EXERCISES.find(e => e.id === id);
                                             return <li key={id} className="text-slate-700">• {ex?.name} <span className="text-slate-400 text-xs">({ex?.description})</span></li>
                                         })
                                        }
                                    </ul>
                                </div>
                                <div className="bg-pink-50/50 p-3 rounded-xl">
                                    <h4 className="font-bold text-pink-700 text-sm mb-2">Agos</h4>
                                    <ul className="list-none space-y-1 text-sm">
                                        {(weekData[day]?.agos || []).length === 0 ? <li className="text-slate-400 italic">Descanso</li> : 
                                         (weekData[day]?.agos || []).map(id => {
                                             const ex = EXERCISES.find(e => e.id === id);
                                             return <li key={id} className="text-slate-700">• {ex?.name} <span className="text-slate-400 text-xs">({ex?.description})</span></li>
                                         })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen pb-10">
      {/* iOS style sticky header */}
      <div className="sticky top-0 z-50 no-print mb-6">
        <div className="backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                    <button onClick={onExit} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="mr-1" size={20} /> <span className="font-medium">Planes</span>
                    </button>
                    <h1 className="font-bold text-lg text-slate-800">{plan.name}</h1>
                    <div className="w-16"></div> 
                </div>
                
                {/* Segmented Control */}
                <div className="flex bg-slate-200/50 p-1 rounded-xl w-full max-w-md mx-auto relative">
                    <button 
                        onClick={() => setActiveTab('menu')}
                        className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative z-10 ${activeTab === 'menu' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Menú
                    </button>
                    <button 
                        onClick={() => setActiveTab('shopping')}
                        className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative z-10 ${activeTab === 'shopping' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Compras
                    </button>
                    <button 
                        onClick={() => setActiveTab('workout')}
                        className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative z-10 ${activeTab === 'workout' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Rutina
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {activeTab === 'menu' && <WeeklyMenuView />}
        {activeTab === 'shopping' && <ShoppingListView />}
        {activeTab === 'workout' && <WorkoutView />}
      </div>
    </div>
  );
};