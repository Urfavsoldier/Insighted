import { AppShell } from "@/components/app-shell";
import { ClassRatingContent } from "@/components/page-content";
import { Role } from "@/lib/types";

function parseRole(value?: string): Role {
  if (value === "teacher" || value === "parent" || value === "admin") return value;
  return "student";
}

export default async function ClassRatingPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = parseRole(params.role);

  return (
    <AppShell title="Рейтинг" eyebrow="Позиции и динамика" role={role}>
      <ClassRatingContent role={role} />
    </AppShell>
  );
}
