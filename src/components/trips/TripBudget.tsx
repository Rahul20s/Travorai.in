"use client";

import type { TripPlan } from "@/types/trip";
import type { BudgetState } from "@/lib/travel/budget-engine";
import { CircleDollarSign, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function TripBudget({ trip, budgetState }: { trip: TripPlan, budgetState?: BudgetState }) {
  // If we have dynamic budget state from selections, use it. Otherwise fallback to AI's initial breakdown.
  if (budgetState) {
    const categories = [
      { name: "Transport", amount: budgetState.spent.transport },
      { name: "Accommodation", amount: budgetState.spent.accommodation },
      { name: "Activities", amount: budgetState.spent.activities },
      { name: "Food", amount: budgetState.spent.food },
      { name: "Local Transport", amount: budgetState.spent.localTransport },
      { name: "Misc", amount: budgetState.spent.misc }
    ].filter(c => c.amount > 0);

    const overBudget = budgetState.remaining < 0;

    return (
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Trip Budget</h2>
            <p className="text-slate-500 font-medium mt-1">
              Allocated: <span className="font-bold text-slate-900">{formatCurrency(budgetState.allocated)}</span>
            </p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${overBudget ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
            <CircleDollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase">Total Selected</h3>
            <p className="text-3xl font-black text-slate-900 mt-2">{formatCurrency(budgetState.totalSpent)}</p>
          </div>
          <div className={`bg-white rounded-2xl p-6 border ${overBudget ? 'border-red-200' : 'border-slate-200'}`}>
            <h3 className="text-sm font-bold text-slate-500 uppercase">Remaining</h3>
            <p className={`text-3xl font-black mt-2 ${overBudget ? 'text-red-600' : 'text-emerald-600'}`}>
              {formatCurrency(budgetState.remaining)}
            </p>
            {overBudget && (
              <div className="flex items-center gap-1 text-xs font-bold text-red-500 mt-2">
                <AlertCircle className="w-3.5 h-3.5" /> Budget exceeded
              </div>
            )}
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">Selected Items Breakdown</h3>
        {categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => {
              const pct = Math.min(100, (item.amount / budgetState.allocated) * 100);
              return (
                <div key={item.name} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
                      <strong className="text-lg font-extrabold text-slate-900">
                        {formatCurrency(item.amount)}
                      </strong>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs font-bold text-slate-400 mt-2">{pct.toFixed(1)}% of total budget</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 border-dashed text-center">
            <p className="text-slate-500 font-medium">No items selected yet. Go to the Travel, Stay, or Activities tabs to select options.</p>
          </div>
        )}
      </div>
    );
  }

  // Fallback to AI breakdown if no dynamic state (should not happen now, but safe)
  if (!trip.budgetBreakdown || trip.budgetBreakdown.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
        <p className="text-slate-500 font-medium">No budget breakdown available for this trip.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Initial AI Budget Estimates</h2>
          <p className="text-slate-500 font-medium mt-1">
            Total estimated cost: <span className="font-bold text-slate-900">₹{(trip.budget || 0).toLocaleString("en-IN")}</span>
          </p>
        </div>
        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <CircleDollarSign className="w-6 h-6" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trip.budgetBreakdown.map((item) => (
          <div key={item.category} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{item.category}</span>
                <strong className="text-lg font-extrabold text-slate-900">
                  {formatCurrency(item.amount)}
                </strong>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <p className="text-xs font-bold text-slate-400 mt-2">{item.percentage}% of total</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
