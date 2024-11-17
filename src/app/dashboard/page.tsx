import SetDefaultNavbar from "@/components/custom/SetDefaultNavbar";
import { getUser } from "@/lib/authUtils";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <SetDefaultNavbar />
      {user.name}
    </div>
  );
};

export default Page;
