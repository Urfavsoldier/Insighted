import { AppShell } from "@/components/app-shell";
import { StudentProfileContent } from "@/components/page-content";
import { Role } from "@/lib/types";

function parseRole(value?: string): Role {
  if (value === "teacher" || value === "parent" || value === "admin") return value;
  return "student";
}

export default async function StudentProfilePage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = parseRole(params.role);

  return (
    <AppShell title="Профиль ученика" eyebrow="Личный профиль" role={role}>
      <StudentProfileContent />
    </AppShell>
  );
}
