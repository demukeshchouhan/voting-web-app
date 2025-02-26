import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Register() {
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
            Register to access voting application and vote for your favorite
            clashes
          </CardDescription>
        </CardHeader>
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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
          <Button className="w-full">Register</Button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold">
              Please Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
