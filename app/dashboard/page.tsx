import { AppShell } from "@/components/app-shell";
import { DashboardContent } from "@/components/page-content";
import { Role } from "@/lib/types";

function parseRole(value?: string): Role {
  if (value === "teacher" || value === "parent" || value === "admin") return value;
  return "student";
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = parseRole(params.role);

  return (
    <AppShell title="Главная" eyebrow="Персональная панель" role={role}>
      <DashboardContent role={role} />
    </AppShell>
  );
}
