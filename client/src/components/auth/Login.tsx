"use client";
import { Label } from "../ui/label";
import Link from "next/link";
import { Input } from "../ui/input";
import { CardContent, CardFooter } from "../ui/card";
import { SubmitButton } from "../common";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/actions/authActions";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    (async () => {
      if (state.status === 500) {
        toast.error(state.message);
      } else if (state.status === 200) {
        toast.success(state.message);
        await signIn("credentials", {
          email: state.data?.email,
          password: state.data?.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
    })();
  }, [state]);

  return (
    <form action={formAction}>
      <CardContent>
        <div className="mb-2">
          <Label htmlFor="email">Username</Label>
          <Input
            type="text"
            id="email"
            placeholder="Username"
            name="email"
            className="mt-1"
          />
          <span className="text-destructive">{state.errors?.email}</span>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            className="mt-1"
          />
          <span className="text-destructive">{state.errors?.password}</span>
          <div className="text-right mt-2">
            <Link href="forgot-password" className="text-primary text-sm ">
              Forgot Password?
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-2">
        <SubmitButton label="Login" />
        <p className="text-sm">
          Don't have any account?{" "}
          <Link href="/register" className="text-primary font-bold">
            Please Register
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};
