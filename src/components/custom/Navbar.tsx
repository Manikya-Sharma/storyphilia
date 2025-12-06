import { auth } from "@/auth";
import ClientSideNavbar from "./ClientSideNavbar";
import { headers } from "next/headers";

const Navbar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return <ClientSideNavbar user={session?.user} />;
};

export default Navbar;
