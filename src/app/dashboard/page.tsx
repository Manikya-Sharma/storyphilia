"use server";

import SetDefaultNavbar from "@/components/custom/SetDefaultNavbar";
import { redirect } from "next/navigation";
import DashboardPageContent from "./DashboardPageContent";
import { headers } from "next/headers";
import { getUser } from "@/lib/authUtils";

const Page = async () => {
  const user = await getUser(await headers());
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
