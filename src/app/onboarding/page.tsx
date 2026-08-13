import { redirect } from "next/navigation";
import Link from "next/link";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { ensureUser } from "@/lib/auth";

type OnboardingPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const user = await ensureUser();
  if (!user) redirect("/sign-in");

  const params = await searchParams;
  const isEdit = params.edit === "1";

  if (user.travelProfile && !isEdit) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <header className="border-b border-[#e5e7eb]/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <Link className="flex items-center gap-2.5" href="/">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-base font-black text-white shadow-md">
              T
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">Travora</span>
          </Link>
        </div>
      </header>
      <OnboardingForm
        initialBudget={user.travelProfile?.defaultBudget ?? 25000}
        initialHomeCity={user.travelProfile?.homeCity ?? ""}
        initialStyles={(user.travelProfile?.travelStyles as Array<"budget" | "solo" | "couple" | "family" | "student" | "luxury" | "adventure" | "romantic">) ?? ["budget"]}
        isEdit={isEdit}
      />
    </main>
  );
}

