import { Protected } from "@/components/auth/Protected";

export default function DashboardPage() {
  return (
    <Protected>
      <h1>Dashboard</h1>
      {/* Protected content */}
    </Protected>
  );
}