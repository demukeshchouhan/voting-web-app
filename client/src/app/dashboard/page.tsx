import Navbar from "@/components/base/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import AddClash from "@/components/clash/AddClash/AddClash";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <Navbar />
      <div className="mt-4 text-end">
        <AddClash user={session?.user!} />
      </div>
    </div>
  );
}

export default Dashboard;
