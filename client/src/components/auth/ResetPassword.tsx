"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CardContent, CardFooter } from "../ui/card";
import { SubmitButton } from "../common";
import { useActionState, useEffect } from "react";
import { resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

export const ResetPassword = () => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(resetPasswordAction, initialState);

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (state.status === 500) {
        toast.error(state.message);
      } else if (state.status === 200) {
        toast.success(state.message);
        setTimeout(() => {
          router.replace("/login");
        }, 1000);
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
            value={params.get("email") || ""}
            readOnly
          />
          <span className="text-destructive">{state.errors?.email}</span>
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
      </CardContent>
      <input type="hidden" name="token" value={params.get("token") || ""} />
      <CardFooter className="flex flex-col justify-center gap-2">
        <SubmitButton label="Reset" />
      </CardFooter>
    </form>
  );
};
