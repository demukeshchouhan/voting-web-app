"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React, { Suspense, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import dynamic from "next/dynamic";
import { ClashType } from "@/lib/type";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
const EditClash = dynamic(() => import("../EditClash/EditClash"));

function ClashCardMenu({
  clash,
  token,
  user,
}: {
  clash: ClashType;
  token: string;
  user: CustomUser;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <Suspense fallback={<p>Loading...</p>}>
          <EditClash open={open} setOpen={setOpen} clash={clash} user={user} />
        </Suspense>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Copy Link</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ClashCardMenu;
