import { ensureUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard, Wallet, MapPin, Receipt, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default async function ExpensesPage() {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  const expenses = await prisma.expense.findMany({
    where: { trip: { ownerId: user.id } },
    include: { trip: true },
    orderBy: { createdAt: "desc" }
  });

  const selections = await prisma.tripSelection.findMany({
    where: { userId: user.id },
    include: { trip: true }
  });

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPlanned = selections.reduce((acc, curr) => acc + curr.price, 0);

  // Group by category (Expenses)
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(ex => {
    categoryTotals[ex.category] = (categoryTotals[ex.category] || 0) + ex.amount;
  });

  const categories = Object.entries(categoryTotals)
    .map(([name, amount]) => ({ name, amount, percentage: Math.round((amount / totalSpent) * 100) || 0 }))
    .sort((a, b) => b.amount - a.amount);

  // Group by trip
  const tripTotals: Record<string, { id: string, name: string, destination: string, spent: number, planned: number }> = {};
  
  expenses.forEach(ex => {
    if (!tripTotals[ex.tripId]) tripTotals[ex.tripId] = { id: ex.tripId, name: ex.trip.name, destination: ex.trip.destination, spent: 0, planned: 0 };
    tripTotals[ex.tripId].spent += ex.amount;
  });
  
  selections.forEach(sel => {
    if (!tripTotals[sel.tripId]) tripTotals[sel.tripId] = { id: sel.tripId, name: sel.trip.name, destination: sel.trip.destination, spent: 0, planned: 0 };
    tripTotals[sel.tripId].planned += sel.price;
  });

  const trips = Object.values(tripTotals).sort((a, b) => b.spent - a.spent);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
      <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Expenses</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-5xl mx-auto w-full px-8 pt-8 space-y-12">
          
          {/* Global Summary */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-xs mb-2">
                  <CreditCard className="w-4 h-4" /> Total Spent
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                  {formatCurrency(totalSpent)}
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-xs mb-2">
                  <Wallet className="w-4 h-4" /> Planned (Selections)
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                  {formatCurrency(totalPlanned)}
                </h2>
              </div>
            </div>
          </section>

          {/* Categories */}
          {categories.length > 0 && (
            <section>
              <h3 className="text-xl font-extrabold text-slate-900 mb-6">Spending by Category</h3>
              <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm space-y-6">
                {categories.map(c => (
                  <div key={c.name} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 capitalize">{c.name.toLowerCase()}</span>
                      <span className="font-extrabold text-slate-900">{formatCurrency(c.amount)}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${c.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-bold text-slate-400">{c.percentage}% of total</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* By Trip */}
          <section>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6">Expenses by Trip</h3>
            {trips.length === 0 ? (
               <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                 <p className="text-slate-500 font-medium">No expenses recorded yet. Track your spending as you travel.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs font-black text-blue-400 uppercase tracking-widest mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {trip.destination}
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 line-clamp-1 mb-6">
                      {trip.name}
                    </h4>
                    
                    <div className="space-y-4 mb-6 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500">Total Spent</span>
                        <span className="text-base font-extrabold text-slate-900">{formatCurrency(trip.spent)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-sm font-semibold text-slate-500">Planned Selections</span>
                        <span className="text-base font-extrabold text-slate-700">{formatCurrency(trip.planned)}</span>
                      </div>
                    </div>

                    <Link href={`/dashboard/trips/${trip.id}?tab=budget`} className="mt-auto">
                      <Button variant="outline" className="w-full rounded-xl font-bold border-slate-200 text-slate-700 hover:bg-slate-50">
                        View Trip Expenses <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Expenses List */}
          {expenses.length > 0 && (
             <section>
               <h3 className="text-xl font-extrabold text-slate-900 mb-6">Recent Expenses</h3>
               <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
                 <div className="divide-y divide-slate-100">
                   {expenses.slice(0, 10).map(expense => (
                     <div key={expense.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                           <Receipt className="w-5 h-5" />
                         </div>
                         <div>
                           <div className="font-bold text-slate-900 capitalize">{expense.category.toLowerCase()}</div>
                           <div className="text-xs font-semibold text-slate-500">{expense.trip.name}</div>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="font-extrabold text-slate-900">{formatCurrency(expense.amount)}</div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                           {new Date(expense.createdAt).toLocaleDateString()}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </section>
          )}

        </div>
      </main>
    </div>
  );
}
