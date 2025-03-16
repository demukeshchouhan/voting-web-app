import Navbar from "@/components/base/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import AddClash from "@/components/clash/AddClash/AddClash";
import { ClashType } from "@/lib/type";
import { fetchClashes } from "../fetch/clashFetch";
import ClashCard from "@/components/clash/ClashCard/ClashCard";

async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const clashes: ClashType[] | [] = await fetchClashes(session?.user?.token!);
  return (
    <div>
      <Navbar />
      <div className="my-8 text-center">
        <AddClash user={session?.user!} />
      </div>
      <div className="w-full flex justify-center">
        <div className="md:grid md:grid-cols-3 md:gap-4">
          {clashes?.map((item, index) => {
            return <ClashCard clash={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
