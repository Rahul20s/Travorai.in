"use client";

import { useState } from "react";
import { CreditCard, Plus, Trash2, ReceiptText, PieChart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { FlightOption, HotelOption, ActivityOption, TransportOption } from "@/lib/travel/types";

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

export function ExpenseTracker({
  budget,
  selectedFlight,
  selectedHotel,
  selectedActivities,
  selectedTransport
}: {
  budget: number;
  selectedFlight?: FlightOption | null;
  selectedHotel?: HotelOption | null;
  selectedActivities?: ActivityOption[];
  selectedTransport?: TransportOption | null;
}) {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "2", amount: 1200, category: "Food", date: "2023-10-13", description: "Dinner at Gunpowder" }
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Food");
  const [newDate, setNewDate] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const plannedCosts = 
    (selectedFlight?.price || 0) + 
    (selectedHotel?.price || 0) + 
    (selectedActivities?.reduce((sum, a) => sum + (a.price || 0), 0) || 0) + 
    (selectedTransport?.price || 0);

  const remainingBudget = budget - totalExpenses - plannedCosts;
  
  const progressPercent = budget > 0 ? Math.min(100, Math.max(0, ((totalExpenses + plannedCosts) / budget) * 100)) : 0;
  const expensePercent = budget > 0 ? Math.min(100, Math.max(0, (totalExpenses / budget) * 100)) : 0;

  const categories = ["Flights", "Stay", "Food", "Activities", "Transport", "Shopping", "Other"];
  const categoryTotals = categories.map(cat => ({
    name: cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  })).filter(c => c.total > 0).sort((a,b) => b.total - a.total);

  const handleAdd = () => {
    if (!newAmount || !newDate || !newDesc) return;
    setExpenses([...expenses, {
      id: Date.now().toString(),
      amount: parseFloat(newAmount),
      category: newCategory,
      date: newDate,
      description: newDesc
    }]);
    setIsAdding(false);
    setNewAmount("");
    setNewDesc("");
    setNewDate("");
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Expense Tracker</h2>
          <p className="text-slate-500 font-medium mt-1">Track your spending against your budget.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 shadow-md shadow-blue-500/20">
          <Plus className="w-4 h-4 mr-2" /> Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary Card */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-blue-500" />
            <h3 className="font-extrabold text-slate-900">Budget Summary</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Total Budget</p>
              <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(budget)}</p>
            </div>
            
            <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${progressPercent > 90 ? 'bg-rose-500' : 'bg-blue-600'}`}
                style={{ width: `${expensePercent}%` }}
                title="Actual Expenses"
              />
              <div 
                className={`h-full transition-all duration-1000 ${progressPercent > 90 ? 'bg-rose-300' : 'bg-blue-300'}`}
                style={{ width: `${progressPercent - expensePercent}%` }}
                title="Planned Selections"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium"><div className="w-2 h-2 rounded-full bg-blue-600" /> Paid</span>
                <span className="font-bold text-slate-900">{formatCurrency(totalExpenses)}</span>
              </div>
              <div className="flex flex-col gap-1 text-center">
                <span className="flex items-center justify-center gap-1.5 text-slate-600 font-medium"><div className="w-2 h-2 rounded-full bg-blue-300" /> Planned</span>
                <span className="font-bold text-slate-900">{formatCurrency(plannedCosts)}</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="flex items-center justify-end gap-1.5 text-slate-600 font-medium"><div className="w-2 h-2 rounded-full bg-slate-200" /> Left</span>
                <span className={`font-bold ${remainingBudget < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(remainingBudget)}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paid By Category</h4>
              {categoryTotals.length === 0 && <div className="text-sm text-slate-400 font-medium">No paid expenses yet.</div>}
              {categoryTotals.map(c => (
                <div key={c.name} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">{c.name}</span>
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(c.total)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expenses List */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Planned Costs (Selections) */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Planned Costs
            </h3>
            <p className="text-sm text-slate-500 font-medium mb-4">These are selections you made in the workspace, but haven't booked or paid for yet.</p>
            
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs">Item</th>
                    <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs">Category</th>
                    <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                    <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs text-right">Estimated</th>
                  </tr>
                </thead>
                <tbody>
                  {!selectedFlight && !selectedHotel && !selectedActivities?.length && !selectedTransport && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 font-medium text-sm">No planned items. Select options in the Trip Workspace first.</td>
                    </tr>
                  )}
                  {selectedFlight && (
                    <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-slate-900">{selectedFlight.provider} Flight</td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wide">Flights</span></td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded uppercase tracking-wide">PLANNED</span></td>
                      <td className="py-4 px-6 text-sm font-extrabold text-slate-900 text-right">{formatCurrency(selectedFlight.price)}</td>
                    </tr>
                  )}
                  {selectedHotel && (
                    <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-slate-900">{selectedHotel.name}</td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wide">Stay</span></td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded uppercase tracking-wide">PLANNED</span></td>
                      <td className="py-4 px-6 text-sm font-extrabold text-slate-900 text-right">{formatCurrency(selectedHotel.price)}</td>
                    </tr>
                  )}
                  {selectedActivities?.map((act) => (
                    <tr key={act.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-slate-900">{act.name}</td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wide">Activities</span></td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded uppercase tracking-wide">PLANNED</span></td>
                      <td className="py-4 px-6 text-sm font-extrabold text-slate-900 text-right">{formatCurrency(act.price)}</td>
                    </tr>
                  ))}
                  {selectedTransport && (
                    <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-slate-900">{selectedTransport.provider} Transport</td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wide">Transport</span></td>
                      <td className="py-4 px-6"><span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded uppercase tracking-wide">PLANNED</span></td>
                      <td className="py-4 px-6 text-sm font-extrabold text-slate-900 text-right">{formatCurrency(selectedTransport.price)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ReceiptText className="w-5 h-5 text-slate-400" />
              Actual Expenses
            </h3>
            
            {isAdding && (
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 mb-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ReceiptText className="w-4 h-4 text-blue-600" /> New Expense
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Amount (₹)</label>
                    <input type="number" value={newAmount} onChange={e=>setNewAmount(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500" placeholder="e.g. 1500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                    <select value={newCategory} onChange={e=>setNewCategory(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Date</label>
                    <input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                    <input type="text" value={newDesc} onChange={e=>setNewDesc(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500" placeholder="What was it for?" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={()=>setIsAdding(false)} className="text-slate-500 rounded-full font-bold">Cancel</Button>
                  <Button onClick={handleAdd} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold">Save Expense</Button>
                </div>
              </div>
            )}

            {expenses.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                <CreditCard className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No expenses logged yet.</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs">Date</th>
                      <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs">Description</th>
                      <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs">Category</th>
                      <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                      <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs text-right">Amount</th>
                      <th className="py-3 px-6 font-bold text-slate-400 uppercase tracking-wider text-xs"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map(e => (
                      <tr key={e.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium text-slate-500">{new Date(e.date).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-sm font-bold text-slate-900">{e.description}</td>
                        <td className="py-4 px-6">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wide">{e.category}</span>
                        </td>
                        <td className="py-4 px-6"><span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wide">PAID</span></td>
                        <td className="py-4 px-6 text-sm font-extrabold text-slate-900 text-right">{formatCurrency(e.amount)}</td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            onClick={() => setExpenses(expenses.filter(x => x.id !== e.id))}
                            className="text-slate-300 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
