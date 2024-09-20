"use client";
import { signin, signup } from "@/app/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingMain } from "../ui/floating-input";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function AuthForm() {
  const pathname = usePathname();
  console.log("current path:", pathname);
  const isSignup = pathname === "/signup";

  const [state, action] = useFormState(isSignup ? signup : signin, undefined);
  console.log("state:", state);

  if (state?.message) {
    toast.error(state.message);
  }

  
  return (
    <form action={action}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle data-id="auth-title" className="text-2xl">
            {isSignup ? "Sign up" : "Sign in"}
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {isSignup && (
            <div data-id="input-name" className="grid gap-2">
              <FloatingMain name="name" id="name" label="Name" />
              {state?.errors?.name && (
                <p className="text-red-500">{state.errors.name}</p>
              )}
            </div>
          )}
          <div data-id="input-email" className="grid gap-2">
            <FloatingMain name="email" id="email" label="Email" />
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
          </div>
          <div data-id="input-password" className="grid gap-2">
            <FloatingMain
              name="password"
              type="password"
              id="password"
              label="Password"
            />
          </div>
        </CardContent>
        <CardFooter data-id="btn-auth">
          <SubmitButton isSignup={isSignup} />
        </CardFooter>
      </Card>
      {state?.errors?.password && (
        <div>
          <p className="text-red-500">Password must:</p>
          <ul className="text-red-500">
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

function SubmitButton({ isSignup }: { isSignup: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full">
      {isSignup ? "sign up" : pending ? "Submitting..." : "Sign in"}
    </Button>
  );
}
