import { AppShell } from "@/components/app-shell";
import { ScheduleBuilder } from "@/components/schedule-builder";
import { Role } from "@/lib/types";

function parseRole(value?: string): Role {
  if (value === "teacher" || value === "parent" || value === "admin") return value;
  return "admin";
}

export default async function SmartSchedulePage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = parseRole(params.role);

  return (
    <AppShell title="Умное расписание" eyebrow="Автоматизация расписания" role={role}>
      <ScheduleBuilder />
    </AppShell>
  );
}
