import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { auth } from "@/lib/auth";
import { dashboardPayloadTemplate } from "@/lib/mock-data";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <AppShell user={session.user} notifications={dashboardPayloadTemplate.notifications}>
      {children}
    </AppShell>
  );
}

