import { ensureUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Compass } from "lucide-react";

export default async function ExplorePage() {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full px-8 py-10 flex flex-col items-center justify-center text-center mt-20">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-500">
            <Compass className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore the World</h2>
          <p className="text-gray-500 max-w-sm">
            Discover new destinations and get inspired for your next adventure. Coming soon!
          </p>
        </div>
      </main>
    </div>
  );
}
