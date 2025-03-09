import Navbar from "@/components/base/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <Navbar />
    </div>
  );
}

export default Dashboard;
