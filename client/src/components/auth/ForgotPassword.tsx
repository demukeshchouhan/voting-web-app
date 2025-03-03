"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CardContent, CardFooter } from "../ui/card";
import { SubmitButton } from "../common";
import { useActionState, useEffect } from "react";
import { forgotPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";

export const ForgotPassword = () => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(
    forgotPasswordAction,
    initialState
  );

  useEffect(() => {
    (async () => {
      if (state.status === 500) {
        toast.error(state.message);
      } else if (state.status === 200) {
        toast.success(state.message);
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
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-2">
        <SubmitButton label="Get Reset Link" />
        {/* <p className="text-sm">
          Don't have any account?{" "}
          <Link href="/register" className="text-primary font-bold">
            Please Register
          </Link>
        </p> */}
      </CardFooter>
    </form>
  );
};
