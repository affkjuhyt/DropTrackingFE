import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth/config";

export default async function DashboardPage() {
  console.log("[DashboardPage] Rendering...");
  const session = await getServerSession(authOptions);
  console.log("[DashboardPage] Session:", session);

  if (!session) {
    console.log("[DashboardPage] No session found, redirecting to /auth/signin");
    redirect("/auth/signin");
  }
  console.log("[DashboardPage] Session found, rendering dashboard");

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Protected content */}
    </div>
  );
}