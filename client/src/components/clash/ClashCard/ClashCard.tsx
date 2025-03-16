import { ClashType } from "@/lib/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClashCardMenu from "../ClashCardMenu/ClashCardMenu";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function ClashCard({ clash }: { clash: ClashType }) {
  const session: CustomSession | null = await getServerSession(authOptions);
  const token = session?.user?.token!;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {clash.title}
          {session?.user && (
            <ClashCardMenu clash={clash} token={token} user={session.user} />
          )}
        </CardTitle>
        <CardDescription>{clash.description}</CardDescription>
      </CardHeader>
      <CardContent className="w-fit">
        {clash.image && (
          <Image
            src={getImageUrl(clash.image)}
            alt={clash.title}
            width="500"
            height="100"
            className="rounded-md w-full h-[220px] object-contain"
          />
        )}
        <p className="mt-4">
          <strong>Expire At: </strong>
          {new Date(clash.expire_at).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant={"secondary"}>Items</Button>
      </CardFooter>
    </Card>
  );
}
