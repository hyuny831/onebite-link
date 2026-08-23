import AppShell from "./AppShell";
import LinkGrid from "./LinkGrid";
import { folders, links } from "./data";

export default function HomeView() {
  return (
    <AppShell>
      <LinkGrid links={links} folders={folders} />
    </AppShell>
  );
}
