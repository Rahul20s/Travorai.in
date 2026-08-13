import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#faf8f5] p-6">
      <div className="grid w-full max-w-md gap-6 text-center">
        <div>
          <Link className="inline-flex items-center gap-2.5" href="/">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-lg font-black text-white shadow-md">
              T
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight">Travora</span>
          </Link>
          <h1 className="font-display mt-6 text-3xl font-extrabold tracking-tight">Create your account</h1>
          <p className="mt-2 text-[#6b7280]">Start planning smarter trips in under a minute.</p>
        </div>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/onboarding" />
      </div>
    </main>
  );
}

