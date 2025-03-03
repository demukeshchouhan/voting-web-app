"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Processing" : label}
    </Button>
  );
}
