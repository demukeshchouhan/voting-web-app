import { ResetPassword } from "@/components/auth/ResetPassword";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React from "react";

function ForgotPasswordPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <CardTitle className="capitalize">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-slate-900 to-primary text-transparent bg-clip-text py-2">
              Welcome to voting app
            </h1>
          </CardTitle>
          <CardDescription>
            You are about to reset your password
          </CardDescription>
        </CardHeader>
        <ResetPassword />
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;
