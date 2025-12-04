"use server";

import SetDefaultNavbar from "@/components/custom/SetDefaultNavbar";
import { getUser } from "@/lib/authUtils";
import { redirect } from "next/navigation";
import DashboardPageContent from "./DashboardPageContent";

const Page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <SetDefaultNavbar />
      <DashboardPageContent user={user} />
    </div>
  );
};

export default Page;
