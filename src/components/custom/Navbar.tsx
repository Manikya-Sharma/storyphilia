import { auth } from "@/auth";
import ClientSideNavbar from "./ClientSideNavbar";

const Navbar = async () => {
  const session = await auth();
  return <ClientSideNavbar user={session?.user} />;
};

export default Navbar;
