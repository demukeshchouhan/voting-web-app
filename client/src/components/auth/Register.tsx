"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerAction } from "@/actions/authActions";
import { SubmitButton } from "@/components/common";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export const RegisterForm = () => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardContent>
        <div className="mb-2">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            className="mt-1"
          />
          <span className="text-destructive">{state.errors?.name}</span>
        </div>
        <div className="mb-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            className="mt-1"
          />
          <span className="text-destructive">{state.errors?.password}</span>
        </div>
        <div className="mb-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="mt-1"
          />
          <span className="text-destructive">
            {state.errors?.confirmPassword}
          </span>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            className="mt-1"
          />
          <span className="text-destructive">{state.errors?.email}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-2">
        <SubmitButton label="Register" />
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold">
            Please Login
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};
