import { useSession } from "@/hooks/useSession";
import { redirect } from "next/navigation";

export default async function PrivateLayout({ children } : {children: React.ReactNode}) {

  const session = await useSession()

  if (!session)
    redirect("/login")

  return children;
}
